import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './Chat.css';
import api from '../../services/api';
import socket from '../../socketConfig.js';

export default class Chat extends Component {

    state = {
        mensagem : "",
        isEmpty : true,
        canAcessAgenda:false,
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
        //this.canAcessAgenda();
    }

    entrarSala = () => {
         const nomeSala = this.props.match.params.nomeSala;
         console.log(this.props.match.params.nomeSala);
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
        this.setState({mensagem:"",isEmpty:true});
        this.renderMensagem(envio);
        socket.emit('sendMessage',envio);
    }

    goToCriarCompromisso = () =>{
        window.location.href = '/CriarCompromisso/'+this.props.match.params.id_anuncio;
    }

    /*canAcessAgenda = () => {
        api.get("/anuncioDetalhes/"+this.props.match.params.id_anuncio).then(res => {
            if(localStorage.getItem('id_usuario') == res.data.id_usuario)
            this.setState({canAcessAgenda:true});
        }).catch(error => {
            console.log(error.data);
        });
    }*/

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
            <button type = "button" className = "btn" disabled = {this.state.canAcessAgenda} onClickCapture = {this.goToCriarCompromisso}>Criar Compromisso</button>
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