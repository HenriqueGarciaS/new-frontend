import React, {Component} from 'react';
import logo from '../../images/logo.png';
import './Header.css';


export default class Header extends Component{

    render(){
      return (
          <div className = "header">
              <img src = {logo} alt = ""/>
          </div>
      ) 
    }




}