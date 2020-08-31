import React,{Component} from 'react';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import SearchBar from '../../components/SearchBar/SearchBar';


export default class PaginaLogada extends Component{
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
                <div className = "pesquisa normal">
                    <p>Ultimos Anuncios feitos</p>
                </div>
            </div>
            </div>
        )
    }
}