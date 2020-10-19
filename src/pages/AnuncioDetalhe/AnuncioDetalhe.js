import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './AnuncioDetalhe.css';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import Noimage from '../../images/No-image.jpg';
import user from '../../images/No-user.png';
import placeholder from '../../images/placeholder.png';
import axios from "axios";
import socket from '../../socketConfig.js';

const baseUrl = "http://localhost:3001/anuncioDetalhes/"


export default class AnuncioDetalhe extends Component{

    state = {
        Anuncio:{},
        fotoUsuario:"",
        avaliacao:"",
    }
    

    async componentDidMount(){
        socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
        const {id_anuncio} = this.props.match.params;
        axios.get(baseUrl+id_anuncio).then(res => {
            this.setState({Anuncio: res.data});
            axios.get('http://localhost:3001/usuario/'+this.state.Anuncio.id_usuario).then(res => {
                this.setState({fotoUsuario:res.data.foto});
            })
        })
    }

    avaliacao = (event) =>{
        if(!("id_usuario" in localStorage))
        alert("Por favor faça login para avaliar");
        else{
        let nota = event.target.value;
        for(let i = 1 ; i <= nota; i++)
        document.getElementById(i).style.backgroundColor = "yellow";
        for(let i = 5; i > nota; i--)
        document.getElementById(i).style.backgroundColor = "gray";
        this.setState({avaliacao:nota});
        }
    }

    renderAvailiacao = () =>{
        return (<div className = "avaliacaoArea">
        <label className = "label" >Deixe sua avaliação</label>
        <br/><br/>
        <label>
        <input type = "radio" name = "escolha" value = "1" onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "1"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "2" onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "2"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "3"  onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "3"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "4"  onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "4"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "5"  onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "5"/>
        </label>
                </div>);
    }

    chooseHeader = () =>{
        if("id_usuario" in localStorage)
        return (
        <div className = "Header">
            <LoginHeader/>
            </div>);
        else
        return (<div className = "Header">
            <NoLoginHeader/>
            </div>);
    }

    getImage = () =>{
        if(this.state.Anuncio.imagem == "")
        return Noimage;
        else
        return "http://localhost:3001/"+this.state.Anuncio.imagem;
        
    }

    getUsuario = () =>{
        if(this.state.fotoUsuario == "")
        return user;
        else
        return 'http://localhost:3001/'+this.state.fotoUsuario;
    }

    goToDenunciar = () =>{
        window.location.href = "http://localhost:3000/Denunciar/"+this.state.Anuncio.id;
    }

    goToChat = () =>{
        let chat = {
            id_prestador : this.state.Anuncio.id_usuario,
            id_contrante : localStorage.getItem("id_usuario"),
            mensagens:"",
            nomeSala:this.state.Anuncio.titulo
        }
        console.log(chat);
        axios.post("http://localhost:3001/gravarChat",chat).then(res =>{
            console.log(res.data);
            window.location.href = "http://localhost:3000/Chat/"+this.state.Anuncio.titulo;
        })
    }

    canDenunciar = () =>{
        if(this.state.Anuncio.id_usuario == localStorage.getItem("id_usuario"))
        return true;
        else
        return false;
    }

    render(){
       return(
            <div>
            {this.chooseHeader()}
            <div className = "pagina">
            <div className = "detalhes">
                <p id = "tituloAnuncio"> {this.state.Anuncio.titulo}</p>
                <div className = "Col">
                <label  className = "label">Descrição:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.descricao}</p>
                <label className = "label">Cidade:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.cidade}</p>
                <label className = "label">Valor:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.valor}</p>
                <label className = "label">Nota:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.classificacao}</p>
                {this.renderAvailiacao()}    
                </div>
            <div className = "btnArea">
                <button className = "btn" onClickCapture = {this.goToChat} >Iniciar Chat</button>
                <button className = "btn" onClickCapture = {this.goToDenunciar}  disabled = {this.canDenunciar()}>Denunciar</button>
            </div>
            </div>
            <div className = "imageArea">
                <div className = "imageAnuncio">
                    <img src = {this.getImage()} id = "Anuncio"/>
                </div>
                <div className = "imageUsuario">
                    <img src = {this.getUsuario()} id = "usuario"/>
                    <small id = "nomeDoUsuario">{this.state.Anuncio.usuario}</small>
                </div>
            </div>
            </div>
            </div>
       );
    }


}