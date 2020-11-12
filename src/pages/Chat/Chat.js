import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './Chat.css';
import api from '../../services/api';
import socket from '../../socketConfig.js';

export default class Chat extends Component {

    state = {
        mensagem : "",
        isEmpty : true,
        mensagens:[],
        canNotAcessAgenda:true
    }

    
    updateField = (event) => {
        let mensagem = event.target.value;
        if(mensagem != "")
        this.setState({mensagem:mensagem,isEmpty:false});
        

    }

    componentDidMount(){
        this.entrarSala();
        this.mensagemRecebida();
        this.accessAgenda();
        
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

    accessAgenda =  () => {
        const id_anuncio = this.props.match.params.id_anuncio
        api.get('/AnuncioDetalhes/'+id_anuncio).then(res => {
            let id = localStorage.getItem('id_usuario');
            if(id == res.data.id_usuario)
            this.setState({canNotAcessAgenda:false});
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
            {<button type = "button" className = "btn" disabled = {this.state.canNotAcessAgenda} onClickCapture = {this.goToCriarCompromisso}>Criar Compromisso</button>}
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