import React, {Component} from 'react';
import '../SearchBar/SearchBar.css';
import {Link} from 'react-router-dom'
import placeholder from '../../images/placeholder.png';


export default class SearchBar extends Component{

    state = {
        titulo:""
    }

         getTitulo = (event) =>{
             this.setState({titulo:event.target.value})
         }

         goToPesquisa = () =>{
             window.location.href = "/Pesquisa/ /"+this.state.titulo;
         }

        render(){
            return(
                <div className = "SearchBar">
                    <div className = "SearchInput">
                    <input type = "text" placeholder = "Estou procurando por..." id = "pesquisa" onChange = {e => this.getTitulo(e)}/>
                    <img src = {placeholder}  id = "lupa" alt = "" onClickCapture = {this.goToPesquisa}/>
                    </div>
                    <br/><br/>
                    <div className = "CategoriasSection">
                     <ul className = "Categorias">
                         <li className = "categoria">
                           <Link to = '/Pesquisa/faxina'>
                           <img src = {placeholder} alt = "" className = "imgCategoria"/>
                           <small className = "Caption">Faxina</small>
                           </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = "/Pesquisa/Conserto">
                             <img src = {placeholder} alt = "" className = "imgCategoria"/>
                             <small className = "Caption">Conserto</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = '/Pesquisa/Encanador'>
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Encanador</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = "/Pesquisa/Pintura">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Pintura</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link  to = "/Pesquisa/Professor">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Professor</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Teste</small>
                             </a>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Teste2</small>
                             </a>
                         </li>
                     </ul>
                        
                    </div>
                </div>
            )
        }




}