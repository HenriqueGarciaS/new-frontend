import React, {Component} from 'react';
import api from '../../services/api';
import './DenunciaAreaPrestador.css';
import Noimage from '../../images/No-image.jpg';
import {Link} from 'react-router-dom';


const denunciaURL = "http://localhost:3001/denunciaPrestador/";

export default class DenunciaArea extends Component {

      state = {
          denuncias:[]
      }

      async componentDidMount(){
        api.get("/denunciaPrestador/"+localStorage.getItem("id_usuario")).then(res =>{
            console.log(res.data);
            this.setState({denuncias:res.data});
        }).catch(error => {
            alert ("falha ao recuperar denuncias");
        })
    }

    renderDenuncias(){
        return this.state.denuncias.map(denuncias =>{
            let src;
            if(denuncias.imagem == "")
            src = Noimage;
            else
            src = "http://localhost:3001"+denuncias.imagem;
            return(
                <div className = "denunciaUser">
                    <Link to = {"/VisualizarDenuncia/"+denuncias.id}>
                        <img src = {src} className = "imagemDenuncia" alt = ""/>
                        <small className = "tituloDaDenuncia">{denuncias.descricao}</small>
                    </Link>
                </div>
            )
        })
    }
 
    renderNoDenuncias(){
        return(
            <div>
                <p id ="mensagem">Parace que você ainda não precisou fazer nenhuma denuncia, que bom!!!</p>
            </div>
        )
    }
 
 
    render(){
        if(this.state.denuncias.length > 0)
        return(
            <div className = "denunciaAreaUser">
                <p id = "tituloDaDenuncias">Denuncias dos seus anuncios</p>
                {this.renderDenuncias()}
            </div>
        );
        else
        return(
            <div className = "noDenunciaAreaUser">
                <p className = "Titulo">Denuncias dos seus anuncios</p>
                {this.renderNoDenuncias()}
            </div>
        )
    }
 
 
 }


