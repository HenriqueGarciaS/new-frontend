import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import Noimage from '../../images/No-image.jpg';
import user from '../../images/No-user.png';
import axios from "axios";

const baseUrl = "http://localhost:3001/anuncioDetalhes/"


export default class AnuncioDetalhe extends Component{

    state = {
        Anuncio:{},
        fotoUsuario:""
    }
    

    async componentDidMount(){
        const {id_anuncio} = this.props.match.params;
        axios.get(baseUrl+id_anuncio).then(res => {
            this.setState({Anuncio: res.data});
            axios.get('http://localhost:3001/usuario/'+this.state.Anuncio.id_usuario).then(res => {
                this.setState({fotoUsuario:res.data.foto});
            })
        })
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


    render(){
       return(
           <div>
            {this.chooseHeader()}
                <div className = "imageArea">
                    <div className = "imageAnuncio">
                     <img src = {this.getImage()} id = "imagemAnuncio"/>
                    </div>
                    <div className = "imageUsuario">
                    <img  src = {this.getUsuario()} id = "imagemUsuario"/>
                    <small>{this.state.Anuncio.usuario}</small>
                    </div>
                </div>
                <div className = "Detalhes">
                    <p>Detalhes do Serviço</p>
                    <div className = "col">
                    
                    </div>
                </div>
           </div>
       );
    }


}