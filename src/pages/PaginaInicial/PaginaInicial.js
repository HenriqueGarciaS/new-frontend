import React, {Component} from 'react';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import './PaginaInicial.css'


export default class PaginaInicial extends Component{


    render(){
        return (
            <div>
              <div className = "header">
                  <NoLoginHeader/>
                  <SearchBar/>
              </div>
                <div ClassName = "anuncioArea">
                <p>Ultimos anuncios feitos</p>
                </div>
             </div>
        )
    }



}