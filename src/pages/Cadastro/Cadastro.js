import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import './Cadastro.css'

export default class Cadastro extends Component{

    render(){
        return (<div>
            <Header/>
            <div className = "Cadastro">
                <p>Criar uma Nova Conta</p>
                <div className = "form-area">
                    <form method = "POST">
                        <div className = "row">
                        <label for = "nome" className = "lblform">Nome:</label>
                        <input type = "text" className = "text" name = "nome" id = "nome"/>
                        <label for = "sobrenome" className = "lblform">Sobrenome:</label>
                        <input type = "text" className = "text" name = "sobrenome" id = "sobrenome"/>
                        </div>
                        <br/>
                        <div className = "row">
                        <label for = "estado" className = "lblform">Estado</label>
                        <select name = "estado" id = "estado">
                            <option value = "Acre">Acre</option>
                            <option value = "Alagoas">Alagoas</option>
                            <option value = "Amapá">Amapá</option>
                            <option value = "Bahia">Bahia</option>
                            <option value = "Ceará">Ceará</option>
                            <option value = "Distrito Federal(DF)">Distrito Federal(DF)</option>
                            <option value = "Espírito Santo">Espírito Santo</option>
                            <option value = "Goias">Goiás</option>
                            <option value = "Maranhão">Maranhão</option>
                            <option value = "Mato Grosso">Mato Grosso</option>
                            <option value = "Mato Grosso do Sul">Mato Grosso do Sul</option>
                            <option value = "Pará">Pará</option>
                            <option value = "Paraíba">Paraíba</option>
                            <option value = "Paraná">Paraná</option>
                            <option value = "Pernambuco">Pernambuco</option>
                            <option value = "Piauí">Piauí</option>
                            <option value = "Rio de Janeiro">Rio de Janeiro</option>
                            <option value = "Rio Grande do Norte">Rio Grande do Norte</option>
                            <option value = "Rio Grande do Sul">Rio Grande do Sul</option>
                            <option value = "Rondônia">Rondônia</option>
                            <option value = "Roraima">Roraima</option>
                            <option value = "Santa Catarina">Santa Catarina</option>
                            <option value = "São Paulo">São Paulo</option>
                            <option value = "Sergipe">Sergipe</option>
                            <option value = "Tocantins">Tocantins</option>
                        </select>
                        <label for = "cidade" className = 'lblform'>Cidade:</label>
                        <input type = "text" name = "cidade" id = "cidade" className = "text"/>
                        </div>
                        <br/>
                        <div className = "row">
                            <label for = "email" className = "lblform">E-mail:</label>
                            <input type = "email" name = "email" id = "email"/>
                            <label for = "senha" className = "lblform">Senha:</label>
                            <input type = "password" id = "senha" name = "senha"/>
                            <br/>
                            <label for = "confirmSenha"  id = "segundaSenha">Confirmar Senha:</label>
                            <input type = "password" id = "confirmSenha" name = "confirmSenha"/>
                        </div>
                        <br/>
                        <div className = "photo-area">
                            <div className = "row">
                            <input type = "file" name="imagem" id="imagem" accept = "image/*"/>
                                <img src = "" alt = "" id = 'fotoUsuario'></img>
                            </div>
                        </div>
                        <br/>
                        <div className = "btn-area">
                            <button onSubmit = "" id = "cadastrar">Cadastrar</button>
                            <a href = "">Já tem conta?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    }






}