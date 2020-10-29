import React,{Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import Noimage from '../../images/No-image.jpg';
import socket from '../../socketConfig.js';
import './PaginaLogada.css';

const urlAnuncios = 'http://localhost:3001/anuncios';

export default class PaginaLogada extends Component{

    state = {
        anuncios:[]
    }

    componentDidMount(){
       socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
       this.getAnuncios();
    }
   
    getAnuncios = async () => {
            api.get("/anuncios").then(res=>{
             this.setState({anuncios:res.data});
             console.log(this.state);
            }).catch(res =>{
                alert("Não foi possivel regastar os anuncios");
            })

    }


    render(){
        return(
            <div>
            <div className = "header">
            <LoginHeader/>
            <SearchBar/>
            </div>
            <div className = 'anuncioArea'>
                <div className = "historico">
                <p>Anuncios Baseados no seu histórico de vizualização</p>
                </div>
                <div className = "pesquisaNormal">
                    <p>Ultimos Anuncios feitos</p>
                    {this.state.anuncios.map(anuncio =>{
                    let src;
                    if(anuncio.imagem === "")
                    src = Noimage;
                    else
                    src = "http://localhost:3001/"+anuncio.imagem;
                        return (
                        <div className = "anuncio">
                        <Link to = {"/Anuncio/"+anuncio.id}>
                        <img src = {src} className = "imagem" alt = ""/>
                        <small className = "tituloDoAnuncio">{anuncio.titulo}</small>
                        </Link>  
                        </div>)
                    })}
                </div>
            </div>
            </div>
        )
    }
}