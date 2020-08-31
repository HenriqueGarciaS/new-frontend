import React, {Component} from 'react';
import '../SearchBar/SearchBar.css';
import placeholder from '../../images/placeholder.png';


export default class SearchBar extends Component{



        render(){
            return(
                <div className = "SearchBar">
                    <div className = "SearchInput">
                    <input type = "text" placeholder = "Estou procurando por..." id = "pesquisa"/>
                    <img src = {placeholder}  id = "lupa" alt = ""/>
                    </div>
                    <br/><br/>
                    <div className = "CategoriasSection">
                     <ul className = "Categorias">
                         <li className = "categoria">
                             <a href="">
                           <img src = {placeholder} alt = "" className = "imgCategoria"/>
                           <small className = "Caption">Faxina</small>
                           </a>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                             <img src = {placeholder} alt = "" className = "imgCategoria"/>
                             <small className = "Caption">Conserto</small>
                             </a>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Encanador</small>
                             </a>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Pintura</small>
                             </a>
                         </li>
                         <li className = "categoria">
                             <a href = "">
                                 <img src = {placeholder} alt = "" className = "imgCategoria"/>
                                 <small className = "Caption">Professor</small>
                             </a>
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