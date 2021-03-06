import api from '../../services/api';
import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import socket from '../../socketConfig.js';
import './Denuncia.css';



const baseUrl = "http://localhost:3001/anuncioDetalhes/";

export default class Denuncia extends Component{

    state = {
        Anuncio:{},
        Descricao:"",
        foto:"",
        isEmpty:true
    }



    componentDidMount(){
        if(!("id_usuario" in localStorage))
        window.location.href = "http://localhost:3000/Entrar";
        socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
        this.loadState();
    }
    

    loadState = async () =>{
        const {id_anuncio} = this.props.match.params;
        api.get("/anuncioDetalhes/"+id_anuncio).then(res => {
            console.log(res.data);
            this.setState({Anuncio: res.data});
        });
        
    }

    updateField = (event) =>{
         let descricao = event.target.value;
         if(descricao === "")
         this.setState({isEmpty:true,Descricao:descricao});
         else
         this.setState({isEmpty:false,Descricao:descricao})
        }

    displayImg(event){
        let img = document.getElementById("denuncia");
        if(event.target.files.length !== 0)
        img.src = URL.createObjectURL(event.target.files[0]);
        else
        img.src = "";
    }

    fileSelect(event){
        this.setState({foto:event.target.files[0]});
        this.displayImg(event);
    }

    save = (event) =>{
        event.preventDefault();
        let tokenAuth;
        if(localStorage.getItem('tokenAuth'))
        tokenAuth = localStorage.getItem('tokenAuth');
        else
        tokenAuth = sessionStorage.getItem('tokenAuth');
        console.log(tokenAuth);
        let id_usuario = localStorage.getItem('id_usuario');
        const data = new FormData();
        data.append('id_contrante',localStorage.getItem('id_usuario'));
        data.append('id_prestador',this.state.Anuncio.id_usuario);
        data.append('descricao',this.state.Descricao);
        data.append('tokenAuth',tokenAuth);
        data.append('id_usuario',id_usuario);
        data.append('file',this.state.foto);
        let Denuncia = {
            id_contrante : window.localStorage.getItem("id_usuario"),
            id_prestador : this.state.Anuncio.id_usuario,
            descricao : this.state.Descricao,
            file: this.state.foto,
            tokenAuth: tokenAuth,
            id_usuario: id_usuario
        };
        api.post("/fazerDenuncia/"+this.state.Anuncio.id,data).then(res =>{
            window.location.href = "http://localhost:3000/"
        }).catch(error =>{
            alert("error");
        })
    }

    renderForm = () =>{
        return (
        <form method = "POST" onSubmit = {e => this.save(e)}>
        <div className = "row">
            <div className = "col">
                <label for = "nome" className = "labelForm">Nome do anuncio:</label>
                <input type = "text" disabled = "true" className = "input" value = {this.state.Anuncio.titulo}/>
            </div>
        </div>
        <div className = "row">
            <div className = "col">
                <label for = "descricacao" className = "labelForm">Descrição sobre o ocorrido:</label>
                <textarea id = "descricao" className = "input" onChange = {e => this.updateField(e)}/>
            </div> 
        </div>
        <div className = "row">
            <div className = "col">
            <label for = "foto" id = "fotoAnuncio" className = "labelForm">Foto para o Anuncio:</label>
            <input type = "file" id = "foto" name = "foto" accept = "image/*" onChange = {e => this.fileSelect(e)}/>
            <img  id = "denuncia"/>
            </div>
        </div>
        <div className = "btn-area">
            <button type = "submit" id="btn" disabled = {this.state.isEmpty}>Denunciar</button>
        </div>
        </form>)
    }




    render(){
        return (
            <div>
                <LoginHeader/>
                <p>Criar denuncia deste Anuncio</p>
                {this.renderForm()}
            </div>
        )
    }



}