import React, {Component} from 'react';
import api from '../../services/api';
import NoImage from '../../images/No-image.jpg';
import {Link} from 'react-router-dom';
import './EstatisticasArea.css';


export default class EstatisticasArea extends Component{

    state = {
        classificacao:[],
        visualizacao:[]
    }


    async componentDidMount(){

        api.get('/estatisticas/'+localStorage.getItem('id_usuario')).then(res=> {
            this.setState({classificacao:res.data.classificacao,visualizacao:res.data.visualizacao});
        }).catch(error => {
            console.log(error.data);
        })
          
    }

    getClassificacao = () => {
        return this.state.classificacao.map(classificacao => {
            let src;
            if(classificacao.imagem == "")
            src = NoImage;
            else
            src = 'http://localhost:3001/'+classificacao.imagem;
            return (
                <div className = 'classificacao'>
                    <Link to = {'/Anuncio/'+classificacao.id}>
                        <img src = {src} className = 'imagemClassificacao' alt = ""/>
                        <small className = 'tituloClassificacao'>{classificacao.titulo}</small>
                    </Link>
                </div>
            )
        })
    }

    getVisualizacao = () => {
        return this.state.visualizacao.map(visualizacao => {
            let src;
            if(visualizacao.imagem == "")
            src = NoImage;
            else
            src = 'http://localhost:3001/'+visualizacao.imagem;
            return (
                <div className = 'visualizacao'>
                    <Link to = {'/Anuncio/'+visualizacao.id}>
                        <img src = {src} className = 'imagemVisualizacao' alt = ''/>
                        <small className = 'tituloVisualizacao'>{visualizacao.titulo}</small>
                    </Link>
                </div>
            )
        })
    }

    renderClassificao = () =>{
        return (
            <div id = 'classificacaoArea'>
            <div className = "tituloArea">
                <p className = 'titulo'>Anuncios por classificação</p>
            </div>
            {this.getClassificacao()}
            </div>
        )
    }

    renderVisualizacao = () => {
        return (
            <div id = 'visualizacaoArea'>
                <div className = "tituloArea">
                <p className = 'titulo'>Anuncios por visualizacao</p>
                </div>
                {this.getVisualizacao()}
            </div>
        )
    }


    render(){
        return (
            <div id = 'estatisticasArea'>
            {this.renderClassificao()}
            {this.renderVisualizacao()}
            </div>
        )
    }




}