import React,{Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from 'axios';
import './PaginaLogada.css';

const urlAnuncios = 'http://localhost:3001/anuncios';

export default class PaginaLogada extends Component{

    state = {
        anuncios:[]
    }

    componentDidMount(){
       this.getAnuncios();
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
                        return (
                        <div className = "anuncio">
                        <a href = "">
                        <img src = {"http://localhost:3001/"+anuncio.imagem} className = "imagem"/>
                        <small className = "titulo">{anuncio.titulo}</small>
                        </a>  
                        </div>)
                    })}
                </div>
            </div>
            </div>
        )
    }
}