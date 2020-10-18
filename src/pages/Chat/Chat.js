import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import io from "socket.io-client";
import './Chat.css'

const socket = io('http://localhost:3002');

export default class Chat extends Component {

    state = {
        mensagem : "",
        isEmpty : true,
        mensagens:[]
    }

    
    updateField = (event) => {
        let mensagem = event.target.value;
        if(mensagem != "")
        this.setState({mensagem:mensagem,isEmpty:false});

    }

    componentDidMount(){
        this.mensagemRecebida();
        this.ultimasMensagens();
    }

    ultimasMensagens = () => {
        socket.on('ultimasMensagens', mensagens =>{
            this.carregarMensagens(mensagens);
        })
    }

    carregarMensagens = (mensagens) => {
        this.setState({mensagens:mensagens});
    }

    mensagemRecebida = () =>{
        socket.on('mensagemRecevida',envio => {
            this.renderMensagem(envio);
        });
    }

    renderMensagem = (mensagem) =>{
        let mensagens = this.state.mensagens;
        mensagens.push(mensagem);
        console.log(mensagens);
        this.setState({mensagens:mensagens});
    }

    

    enviarMensagem = (event) =>{
        event.preventDefault();
        let envio = {
            usuario: "teste",
            mensagem : this.state.mensagem
        };
        this.renderMensagem(envio);
        socket.emit('sendMessage',envio);
    }

    renderChat(){
        return (
            <form method = "post" onSubmit = {e => this.enviarMensagem(e)}>
            <div id = "mensagens">
            {this.state.mensagens.map(mensagem => {
                return (
                    <div className = "novaMensagem">
                        <strong>{mensagem.usuario}</strong>:
                        {mensagem.mensagem}
                    </div>
                )
            })}
            </div>
            <input type = "text" id = "texto" className = "input" onChange = {e => this.updateField(e)}/>
            <button type = "submit" className = "btn" disabled = {this.state.isEmpty}>Enviar</button>
            </form>
        )
    }

    render(){
       return (
       <div>
       <LoginHeader/>
       {this.renderChat()}
       </div>
       )
    }



}