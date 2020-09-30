import React, {Component} from 'react';
import Axios from 'axios';
import './AnuncioArea.css';
import Noimage from '../../images/No-image.jpg';
import {Link} from 'react-router-dom';


const anuncioURL = "http://localhost:3001/anuncio/"

export default class AnuncioArea extends Component{

    state = {
        anuncios:[],
    }

     async componentDidMount(){
         Axios.get(anuncioURL+localStorage.getItem("id_usuario")).then(res =>{
             console.log(res.data)
             this.setState({anuncios:res.data});
         }).catch(error => {
             alert("falha ao recuperar anuncios");
         })
     }


     goToAnunciar = () =>{
         window.location.href = "http://localhost:3000/CadastrarServico";
     }


    renderAnuncios(){
        return this.state.anuncios.map(anuncio =>{
                let src;
                if(anuncio.imagem == "")
                src = Noimage;
                else
                src = "http://localhost:3001/"+anuncio.imagem;
                return (
                    <div className = "anuncioUser">
                        <Link to = {"/AlterarAnuncio/"+anuncio.id}>
                            <img src = {src} className = "imagemAnuncio" alt = ""/>
                            <small className = "tituloDoAnuncio">{anuncio.titulo} </small>
                        </Link>
                    </div>

                )
            }
        )      
    }


    renderNoAnuncios(){
        return (
            <div>
            <p id = "mensagem">Parece que você ainda não fez nenhum anuncio ainda,Deseja fazer um agora?</p>
            <button id = "goToAnunciar" onClickCapture = {this.goToAnunciar}>Anunciar</button>
            </div>
        )
    }



    render(){

        if(this.state.anuncios.length > 0)
        return (
            <div className = "anuncioAreaUser" >
                <p id = "tituloDoAnuncios">Seus Anuncios</p>
                {this.renderAnuncios()}
            </div>);
        else
        return (
            <div className = "noAnuncioAreaUser">
                <p className = "Titulo">Seus Anuncios</p>
                {this.renderNoAnuncios()}
            </div>);
    }


}