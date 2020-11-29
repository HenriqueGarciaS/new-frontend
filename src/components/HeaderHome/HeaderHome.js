import React from 'react';
import Menu from '../menu';
import './Header.css';
import logo from '../../images/logo2.png';

const HeaderHome = () =>(
    <header className="app-header">
        <img className="app-header__logo" src={logo}/>
        <Menu/>
    </header>
)

export default HeaderHome;