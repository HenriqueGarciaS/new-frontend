import React, {Component} from 'react';
import '../SearchBar/SearchBar.css';
import conserto from '../../images/ConsertoIcone.png';
import encanador from '../../images/EncanadorIcone.png';
import faxina from '../../images/FaxinaIcone.png';
import pintura from '../../images/PinturaIcone.png';
import professor from '../../images/ProfessorIcone.png';
import lupa from '../../images/Lupa.png';
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
                    <img src = {lupa}  id = "lupa" alt = "" onClickCapture = {this.goToPesquisa}/>
                    </div>
                    <br/><br/>
                    <div className = "CategoriasSection">
                     <ul className = "Categorias">
                         <li className = "categoria">
                           <Link to = '/Pesquisa/faxina'>
                           <img src = {faxina} alt = "" className = "imgCategoria"/>
                           <small className = "Caption">Faxina</small>
                           </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = "/Pesquisa/Conserto">
                             <img src = {conserto} alt = "" className = "imgCategoria"/>
                             <small className = "Caption">Conserto</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = '/Pesquisa/Encanador'>
                                 <img src = {encanador} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Encanador</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link to = "/Pesquisa/Pintura">
                                 <img src = {pintura} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Pintura</small>
                             </Link>
                         </li>
                         <li className = "categoria">
                             <Link  to = "/Pesquisa/Professor">
                                 <img src = {professor} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Professor</small>
                             </Link>
                         </li>
                         
                     </ul>
                        
                    </div>
                </div>
            )
        }




}