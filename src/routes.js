import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaLogada from './pages/PaginaLogada/PaginaLogada';
import Autenticacao from './pages/Autenticacao/Autenticacao';
import Cadastro from './pages/Cadastro/Cadastro';
import CadastrarServico from './pages/CadastrarServico/CadastrarServico';
import AnuncioDetalhe from './pages/AnuncioDetalhe/AnuncioDetalhe';

export default class Routes extends Component{
    render(){
    return (<BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {PaginaInicial}/>
      <Route path = "/PaginaLogada" component = {PaginaLogada}/>
      <Route path = "/Entrar" component = {Autenticacao}/>
      <Route path = "/Cadastrar" component = {Cadastro}/>
      <Route path = "/CadastrarServico" component = {CadastrarServico}/>
      <Route path = "/Anuncio/:id_anuncio" component = {AnuncioDetalhe} />
    </Switch>
    </BrowserRouter>
    )
    }
}