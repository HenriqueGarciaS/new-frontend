import React, {Component} from 'react';
import Axios from 'axios';
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


    renderAnuncios(){
        return this.state.anuncios.map(anuncio =>{
                let src;
                if(anuncio.imagem == "")
                src = Noimage;
                else
                src = "http://localhost:3001/"+anuncio.imagem;
                return (
                    <div className = "anuncioUser">
                        <Link to = "">
                            <img src = {src} className = "imagemAnuncio" alt = ""/>
                            <small className = "titulo">{anuncio.titulo} </small>
                        </Link>
                    </div>

                )
            }
        )


        
        
    }


    render(){
        return (
            <div className = "anuncioAreaUser" >
                <p>Seus Anuncios</p>
                {this.renderAnuncios()}
            </div>);
    }

}