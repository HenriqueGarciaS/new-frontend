import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './AnuncioDetalhe.css';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import Noimage from '../../images/No-image.jpg';
import user from '../../images/No-user.png';
import placeholder from '../../images/placeholder.png';
import api from '../../services/api';
import socket from '../../socketConfig.js';

const baseUrl = "http://localhost:3001/anuncioDetalhes/"


export default class AnuncioDetalhe extends Component{

    state = {
        Anuncio:{},
        fotoUsuario:"",
        classificacao:"",
    }
    

    async componentDidMount(){
        socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
        const {id_anuncio} = this.props.match.params;
        api.get("/anuncioDetalhes/"+id_anuncio).then(res => {
            this.setState({Anuncio: res.data});
            api.get('/usuario/'+this.state.Anuncio.id_usuario).then(res => {
                this.setState({fotoUsuario:res.data.foto});
                this.newHistorico();
            })
        })
    }

    newHistorico = async () => {
        console.log("enviando historico");
        if(localStorage.getItem("id_usuario")){
            let newHistorico = {categoria:this.state.Anuncio.categoria}
            console.log(newHistorico.categoria);
            api.post('/updateUsuario/newHistorico/'+localStorage.getItem("id_usuario"),newHistorico).then(res => {
                console.log(res.data);
            }).catch(error => {
                console.log(error.data);
            })
        }
    }

    avaliacao = async (event) =>{
        if(!("id_usuario" in localStorage))
        alert("Por favor faça login para avaliar");
        else{
        let nota = event.target.value;
        for(let i = 1 ; i <= nota; i++)
        document.getElementById(i).style.backgroundColor = "yellow";
        for(let i = 5; i > nota; i--)
        document.getElementById(i).style.backgroundColor = "gray";

            let data = {
                nota:parseInt(nota)
            }


        api.post('/updateAnuncio/novaClassificacao/'+this.state.Anuncio.id,data).then(res =>{
            console.log(res.data);
            alert("classicacao enviada com sucesso");
            window.location.reload();
        }).catch(error => {
            console.log(error.data);
        })
        }
    }

    renderAvailiacao = () =>{
        return (<div className = "avaliacaoArea">
        <label className = "label" >Deixe sua avaliação</label>
        <br/><br/>
        <label>
        <input type = "radio" name = "escolha" value = "1" className = "radio" style = {{display:"none"}} onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "1"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "2" className = "radio" style = {{display:"none"}} onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "2"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "3" className = "radio" style = {{display:"none"}}   onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "3"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "4" className = "radio" style = {{display:"none"}} onClick = {e => this.avaliacao(e)}/>
        <img src = {placeholder} className = "avaliacao" id = "4"/>
        </label>
        <label>
        <input type = "radio" name = "escolha" value = "5" className = "radio" style = {{display:"none"}} onClick = {e => this.avaliacao(e)}/>
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
        if(!localStorage.getItem("id_usuario"))
        window.location.href = "http://localhost:3000/entrar";
        let chat = {
            id_prestador : this.state.Anuncio.id_usuario,
            id_contrante : localStorage.getItem("id_usuario"),
            id_anuncio: this.state.Anuncio.id,
            mensagens:"",
            nomeSala:this.state.Anuncio.titulo+"-"+localStorage.getItem("nome_usuario")
        }
        console.log(chat);
        api.post("/gravarChat",chat).then(res =>{
            console.log(res.data);
            window.location.href = "http://localhost:3000/Chat/"+chat.nomeSala+"/"+this.state.Anuncio.id;
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
                <label className = "label">Horarios:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.horarios}</p>
                <label className = "label">Nota:</label>
                <p className = "detalheAnuncio">{this.state.Anuncio.classificacao}</p>
                {this.renderAvailiacao()}    
                </div>
            <div className = "btnArea">
                <button className = "btn" onClickCapture = {this.goToChat} disabled = {this.canDenunciar()} >Iniciar Chat</button>
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