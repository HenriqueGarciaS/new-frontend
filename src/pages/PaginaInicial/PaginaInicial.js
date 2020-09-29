import React, {Component} from 'react';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import './PaginaInicial.css';
import axios from 'axios';
import Noimage from '../../images/No-image.jpg';

const urlAnuncios = 'http://localhost:3001/anuncios';


export default class PaginaInicial extends Component{

    state = {
        anuncios:[]
    }

    componentDidMount(){
        if("id_usuario" in localStorage)
        window.location.href = 'http://localhost:3000/PaginaLogada';
        else{
            this.getAnuncios();
        }
    }

    getAnuncios = async () => {
        axios.get(urlAnuncios).then(res=>{
         this.setState({anuncios:res.data});
         console.log(this.state);
        }).catch(res =>{
            alert("Não foi possivel regastar os anuncios");
        })

    }



    render(){
        return (
            <div>
              <div className = "header">
                  <NoLoginHeader/>
                  <SearchBar/>
              </div>
                <div ClassName = "anuncioArea">
                <p>Ultimos anuncios feitos</p>
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
        )
    }



}