import api from '../../services/api';
import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import socket from '../../socketConfig.js';
import './AlterarDenuncia.css';



const baseUrl = "http://localhost:3001/anuncioDetalhes/";

export default class AlterarDenuncia extends Component{

    state = {
        Denuncia:{},
        Anuncio:{},
        isEmpty:false
    }



    componentDidMount(){
        this.loadState();
        socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
    }
    

    loadState = async () =>{
        const {id_denuncia} = this.props.match.params;
        api.get("/verDenuncia/"+id_denuncia).then(res =>{
            this.setState({Denuncia:res.data});
            api.get("/anuncioDetalhes/"+res.data.id_anuncio).then(res =>{
                this.setState({Anuncio:res.data});
            }).catch(error =>{
                alert("erro ao recuperar dados do anuncio");
            })
        }).catch(error => {
            alert("erro ao recuperar dados da denuncia");
        })
       
        
    }

    updateField = (event) =>{
           const Denuncia = {...this.state.Denuncia};
           console.log(event.target.name);
           Denuncia[event.target.name] = event.target.value;
           if(Denuncia.descricao != "")
           this.setState({Denuncia,isEmpty:false});
           console.log(this.state.Denuncia);
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
        let Denuncia = {...this.state.Denuncia};
        if(localStorage.getItem('tokenAuth'))
        Denuncia['tokenAuth'] = localStorage.getItem('tokenAuth');
        else
        Denuncia['tokenAuth'] = sessionStorage.getItem('tokenAuth');
        Denuncia['id_usuario'] = localStorage.getItem('id_usuario');
        console.log(Denuncia);
        api.post("/updateDenuncia/"+this.state.Denuncia.id,Denuncia).then(res =>{
            alert("dados Atualizados");
            window.location.reload();
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
                <textarea id = "descricao" name = "descricao" className = "input" onChange = {e => this.updateField(e)} value = {this.state.Denuncia.descricao}/>
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
