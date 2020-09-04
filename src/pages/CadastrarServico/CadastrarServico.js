import React, {Component} from 'react';
import HeaderServico from '../../components/HeaderServico/HeaderServico';
import './CadastrarServico.css';



export default class CadastrarServico extends Component{


    render(){
        return(
            <div>
                <HeaderServico/>
                <div className = "Pagina-CadastrarServico">
                    <p>Criar novo anuncio de serviço</p>
                    <div className = "form-area">
                        <form method = "POST" onSubmit = "">
                            <div className = "row">
                                <div className = "col">
                                    <label for = "nome" id = "lblnome" className = "labelForm">Nome do serviço:*</label>
                                    <input type = "text" id = "nome" name = "nome" className = "input"/>
                                </div>
                                <div className = "col">
                                    <label for = "cidade" id = "lblcidade" className = "labelForm">Cidade do serviço:*</label>
                                    <input type = "text" id = "cidade" name = "cidade" className = "input"/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "descricao" id = "lbldescricao" className = "labelForm">Descrição:*</label>
                                    <textarea id = "descricao" name = "descricao" className = "input"/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "horarios" id = "lblhorarios" className = "labelForm">Horarios Disponiveis:*</label>
                                    <input type = "text" id = "horarios" name = "horarios" className = "input"/>
                                </div>
                                <div className = "col">
                                    <label for = "valor" id = "lblvalor" className = "labelForm">Valor:*</label>
                                    <input type = "number" id = "valor" name = "valor" className = "input"  min = "1" max = "100000"  step = "0.01"/>
                                </div>
                                <div className = "col">
                                    <label for = "categoria" id = "lblcategoria" className = "labelForm">Categoria</label>
                                    <select id = "categoria" className = "input">
                                    <option disabled selected>Escolha a categoria...</option>
                                    </select>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "foto" id = "fotoAnuncio" className = "labelForm">Foto para o Anuncio:</label>
                                    <input type = "file" id = "foto" name = "foto" accept = "image/*"/>
                                    <img  id = "anuncio"/>
                                </div>
                            </div>
                            <div className = "btn-area">
                                <button type = "submit" id="btn">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }



}