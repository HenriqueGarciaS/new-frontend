import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './Chat.css'
import socket from '../../socketConfig.js';

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
        console.log(this.state);

    }

    componentDidMount(){
        this.entrarSala();
        this.mensagemRecebida();
    }

    entrarSala = () => {
         const {nomeSala} = this.props.match.params;
         socket.emit('entrarSala',nomeSala);
         socket.on('mensagensAntigas',mensagens => {
             console.log(mensagens);
             this.carregarMensagens(mensagens);
         })
    }

    /*ultimasMensagens = () => {
        socket.on('mensagensAntigas', mensagens =>{
            this.carregarMensagens(mensagens);
        })
    }*/

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
            usuario: localStorage.getItem("nome_usuario"),
            mensagem : this.state.mensagem
        };
        document.getElementById("texto").value = "";
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