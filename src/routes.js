import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaLogada from './pages/PaginaLogada/PaginaLogada';
import Autenticacao from './pages/Autenticacao/Autenticacao';
import Cadastro from './pages/Cadastro/Cadastro';
import CadastrarServico from './pages/CadastrarServico/CadastrarServico';
import AnuncioDetalhe from './pages/AnuncioDetalhe/AnuncioDetalhe';
import Denuncia from './pages/Denuncia/Denuncia';
import PaginaUsuario from './pages/PaginaUsuario/PaginaUsuario';
import AlterarAnuncio from './pages/AlterarAnuncio/AlterarAnuncio';
import VisualizarDenuncia from './pages/VisualizarDenuncia/VisualizarDenuncia';
import AlterarDenuncia from './pages/AlterarDenuncia/AlterarDenuncia';
import Chat from './pages/Chat/Chat';

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
      <Route path = "/Denunciar/:id_anuncio" component = {Denuncia} />
      <Route path = "/PaginaUsuario" component = {PaginaUsuario} />
      <Route path = "/AlterarAnuncio/:id_anuncio" component = {AlterarAnuncio} />
      <Route path = "/VisualizarDenuncia/:id_denuncia" component = {VisualizarDenuncia}/>
      <Route path = "/AlterarDenuncia/:id_denuncia" component = {AlterarDenuncia}/>
      <Route path = "/Chat/:nomeSala" component = {Chat} />
    </Switch>
    </BrowserRouter>
    )
    }
}