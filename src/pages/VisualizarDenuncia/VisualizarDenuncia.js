import api from '../../services/api';
import React, {Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './VisualizarDenuncia.css';




const baseUrl = "http://localhost:3001/visualizarDenuncia/";

export default class VisualizarDenuncia extends Component{

    state = {
        Denuncia:{}
    }



    componentDidMount(){
        this.loadState();
    }
    

    loadState = async () =>{
        const {id_denuncia} = this.props.match.params;
        api.get("/verDenuncia/"+id_denuncia).then(res => {
            console.log(res.data);
            this.setState({Denuncia: res.data});
        });
        
    }

  

    fileSelect(event){
        this.setState({foto:event.target.files[0]});
        this.displayImg(event);
    }

    renderForm = () =>{
        return (
        <form method = "POST" onSubmit = {e => this.save(e)}>
        <div className = "row">
            <div className = "col">
                <label for = "descricacao" className = "labelForm">Descrição sobre o ocorrido:</label>
                <textarea id = "descricao" className = "input" disabled = "True" value = {this.state.Denuncia.descricao}/>
            </div> 
        </div>
        <div className = "row">
            <div className = "col">
            <label for = "foto" id = "fotoAnuncio" className = "labelForm">Foto da Denuncia:</label>
            <img  id = "denuncia"/>
            </div>
        </div>
        <div className = "btn-area">
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