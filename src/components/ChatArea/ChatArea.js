import React, {Component} from 'react';
import noImage from '../../images/No-image.jpg';
import api from '../../services/api';
import './ChatArea.css';
import {Link} from 'react-router-dom';

export default class ChatArea extends Component {
      
    state = {
        chats : []
    }

    async componentDidMount(){
        api.get("/todosChats/"+localStorage.getItem("id_usuario")).then(res => {
            this.setState({chats:res.data});
        }).catch(error => {
            console.log(error.data);
        })
    }

    renderChats(){
        return this.state.chats.map(chats =>{
            return(
                <div className = "ChatUser">
                    <Link to = {"/Chat/"+chats.nome+"/"+chats.id_anuncio}>
                        <img src = {noImage} className = "imagemChat" alt = ""/>
                        <small className = "tituloChat">{chats.nome}</small>
                    </Link>
                </div>
            )
        })
    }


    renderNoChat(){
        return(
            <div>
                <p id ="mensagem">Você ainda não iniciou nenhuma conversa</p>
            </div>
        )
    }


    render(){
        if(this.state.chats.length > 0)
        return(
            <div className = "ChatAreaUser">
                <p id = "tituloChat">Suas Conversas</p>
                {this.renderChats()}
            </div>
        );
        else
        return(
            <div className = "noChatAreaUser">
                <p className = "Titulo">Suas Conversas</p>
                {this.renderNoChat()}
            </div>
        )
    }
}