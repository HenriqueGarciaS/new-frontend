import React,{Component} from 'react';
import UserForm from '../../components/UserForm/UserForm';
import AnunciosArea from '../../components/AnuncioArea/AnuncioArea';
import './PaginaUsuario.css'

export default class PaginaUsuario extends Component{

    state = {
        anuncios:{},
        denunciasUsuario:{},
        denunciasAnuncios:{},
        formChoosed: 0,
    }

    formChoosed = () =>{
        let formChoosed = this.state.formChoosed;
        
        switch(formChoosed){
            case 0:
                return <UserForm/>
            case 1:
                return <AnunciosArea/>
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
        return(
            <div id = "UserBar">
                <div id = "imageArea">
                    <img id = "fotoUsuario" src = {"http://localhost:3001/"+localStorage.getItem("foto_usuario")} />
                    <small id = "nomeUsuario">{localStorage.getItem("nome_usuario")}</small>
                </div>
                <div id = "linkArea">
                    <button className = "btnComponent" value = "0" onClick = {e => this.chooseForm(e)}>Editar Dados Cadastrais</button>
                    <button className = "btnComponent" value = "1" onClick = {e => this.chooseForm(e)}>Editar Anuncios</button>
                    <button className = "btnComponent" value = "2" onClick = {e => this.chooseForm(e)}>Ver denuncias feitas sobre seus anuncios</button>
                    <button className = "btnComponent" value = "3" onClick = {e => this.chooseForm(e)}>Ver suas denuncias</button>
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