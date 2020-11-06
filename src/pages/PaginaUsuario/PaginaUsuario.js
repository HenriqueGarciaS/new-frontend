import React,{Component} from 'react';
import UserForm from '../../components/UserForm/UserForm';
import AnunciosArea from '../../components/AnuncioArea/AnuncioArea';
import DenunciasArea from '../../components/DenunciaArea/DenunciaArea';
import DenunciaAreaPrestador from '../../components/DenunciaAreaPrestador/DenunciaAreaPrestador';
import ChatArea from '../../components/ChatArea/ChatArea';
import Agenda from '../../components/Agenda/Agenda';
import api from '../../services/api';
import './PaginaUsuario.css';
import user from '../../images/No-user.png';

export default class PaginaUsuario extends Component{

    state = {
        formChoosed: 0,
    }

    formChoosed = () =>{
        let formChoosed = this.state.formChoosed;
        
        switch(formChoosed){
            case 0:
                return <UserForm/>
            case 1:
                return <AnunciosArea/>
            case 2:
                return <DenunciaAreaPrestador/>
            case 3:
                return <DenunciasArea/>
            case 4 :
                return <ChatArea/>
            case 5:
               return window.location.href = "http://localhost:3000";
            case 6:
                return <Agenda/>
            case 7:{
                api.get('/logout/'+localStorage.getItem('id_usuario'));
                sessionStorage.clear();
                window.localStorage.clear();
                return window.location.href = "/";
            }
            
        }
    }


    chooseForm = (event) =>{
        event.preventDefault();
        let formChoosed = parseInt(event.target.value);
        this.setState({formChoosed})
    }

    printValue = (event) =>{
        console.log(event.target.value);
    }

    renderUserBar = () =>{
        let src = "http://localhost:3001/"+localStorage.getItem("foto_usuario");
        if(localStorage.getItem("foto_usuario") == "")
        src = user;
        return(
            <div id = "UserBar">
                <div id = "imageArea">
                    <img id = "fotoUsuario" src = {src} />
                    <small id = "nomeUsuario">{localStorage.getItem("nome_usuario")}</small>
                </div>
                <div id = "linkArea">
                    <button className = "btnComponent" value = "0" onClick = {e => this.chooseForm(e)}>Editar Dados Cadastrais</button>
                    <button className = "btnComponent" value = "1" onClick = {e => this.chooseForm(e)}>Editar seus Anuncios</button>
                    <button className = "btnComponent" value = "2" onClick = {e => this.chooseForm(e)}>Ver denuncias feitas sobre seus anuncios</button>
                    <button className = "btnComponent" value = "3" onClick = {e => this.chooseForm(e)}>Ver suas denuncias</button>
                    <button className = "btnComponent" value = "4" onClick = {e => this.chooseForm(e)}>Ver todos as conversas</button>
                    <button className = "btnComponent" value = "6" onClick = {e => this.chooseForm(e)}>Ver agenda</button>
                    <button className = "btnComponent" value = "7" onClick = {e => this.chooseForm(e)}>Sair da Plataforma</button>
                    <button className = "btnComponent" value = "5" onClick = {e => this.chooseForm(e)}>Voltar a Pagina Inicial</button>
                </div>
            </div>
        )
    }





     render(){
         return (
             <div>
             {this.renderUserBar()}
             {this.formChoosed()}
             </div>
             
         )
     }



}