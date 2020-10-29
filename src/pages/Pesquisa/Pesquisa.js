import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import NoLoginHeader from '../../components/NoLoginHeader/NoLoginHeader';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './Pesquisa.css';
import noImage from '../../images/No-image.jpg';


export default class Pesquisa extends Component {


    state = {
        
        anuncios: [],
        filtro : {categoria: "",
        cidade: "",
        nome: "",
        titulo:"",
        avaliacao:0,
        preco:0
        }

    }

    async componentDidMount(){
         let filtro = this.props.match.params;
         if(filtro.titulo == null)
         filtro.titulo = "";
         if(filtro.categoria == null || filtro.categoria == " ")
         filtro.categoria = "";

         api.post('/anuncioFiltro',filtro).then(res => {
             console.log(res.data);
             this.setState({anuncios:res.data});
         }).catch(error => {
             console.log(error.data);
         })
    }

   
    chooseHeader = () => {
        if(localStorage.getItem("id_usuario"))
        return <LoginHeader/>;
        else
        return <NoLoginHeader/>;
    }

    radioChoose = (event) => {
        const filtro = {...this.state.filtro};
        filtro[event.target.name] = event.target.value;
        this.setState({filtro});
    }

    changeOutPut = (event) => {
        const filtro = {...this.state.filtro};
        filtro[event.target.name] = parseFloat(event.target.value);
        this.setState({filtro});
    }

    updateAnuncios =  async () => {
        api.post('/anuncioFiltros',this.state.filtro).then(res =>{
            this.setState({anuncios:res.data});
        }).catch(error => {
            console.log(error.data);
        })
    }

    cleanUpdate = async () => {
        let cleanFiltro = {
        categoria: "",
        cidade: "",
        nome: "",
        titulo:"",
        avaliacao:0,
        preco:0
        }

        api.post('/anuncioFiltros',cleanFiltro).then(res => {
            this.setState({anuncios:res.data});
        }).catch(error => {
            console.log(error.data);
        })
    }

    renderAnuncios = () =>{
        if(this.state.anuncios.length > 0)
        return (
            <div className = "pesquisaArea">
                <p id = "tituloPesquisa">Anuncios:</p>
                {this.state.anuncios.map(anuncio =>{
                    let src;
                    if(anuncio.imagem === "")
                    src = noImage;
                    else
                    src = "http://localhost:3001/"+anuncio.imagem;
                        return (
                        <div className = "anuncio">
                        <Link to = {"/Anuncio/"+anuncio.id}>
                        <img src = {src} className = "imagem" alt = ""/>
                        <small className = "tituloDoAnuncio">{anuncio.titulo}</small>
                        </Link>  
                        </div>)
                    })}
            </div>
        )
        else
        return (
            <div className = "pesquisaArea">
                <p id = "tituloPesquisa">Nenhum anuncio encontrado</p>
            </div>
        )
    }

    renderFiltroBar = () => {
        return (
            <div id = "FiltroBar">
                <button className = "btnFiltro" onClickCapture = {this.updateAnuncios}>Filtrar</button>
                <button className = "btnFiltro" onClickCapture = {this.cleanUpdate}>Limpar Pesquisar</button>
                <p>Filtros</p>
                <div className = "rowFiltro">
                    <p className = "nameFiltro">Titulo do anuncio</p>
                    <div className = "colFiltro">
                    <input type = "text" placeholder = "Ex: Professor Particular" id = "pesquisaNome" onChange = {e => this.radioChoose(e)}/>
                    </div>
                </div>
                <div className = "rowFiltro">
                    <p className = "nameFiltro">Categoria do Anuncio:</p>
                    <form>
                    <div className = "colFiltro">
                    <input type = "radio" value = "faxina" id = "faxina"  name = "categoria" className = "check" onChange = {e => this.radioChoose(e)}/>
                    <label for = "faxina">Faxina</label>
                    </div>
                    <div className = "colFiltro">
                        <input type = "radio" value = "conserto"  id = "conserto"  name = "categoria" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "conserto">Conserto</label>
                    </div>
                    <div className = "colFiltro">
                        <input type = "radio" value = "professor" id = "professor"  name = "categoria" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "professor">Professor</label>
                    </div>
                    <div className = "colFiltro">
                        <input type = "radio" value = "encanador" id = "encanador"  name = "categoria" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "encanador">Encanador</label>
                    </div>
                    <div className = "colFiltro">
                        <input type = "radio" value = "pintura" id = "pintura" name = "categoria" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "pintura">Pintura</label>
                    </div>
                    </form>
                </div>
                <div className = "rowFiltro">
                    <p className = "nameFiltro">Cidade do Anuncio:</p>
                    <div className = "colFiltro">
                        <input type = "radio" value = "campinas"  id = "campinas" name = "cidade" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "campinas">Campinas</label>
                    </div>
                    <div className = "colFiltro">
                        <input type = "radio" value = "são paulo" id = "são paulo" name = "cidade" className = "check" onChange = {e => this.radioChoose(e)}/>
                        <label for = "campinas">São Paulo</label>
                    </div>
                </div>
                <div class = "rowFiltro">
                    <p class = "nameFiltro">Availiação do Anuncio:</p>
                    <div className = "colFiltro">
                        <input type = "range" min = "0" max = "5" step = "1" id = "avaliacao" name = "avaliacao" onChange = {e => this.changeOutPut(e)}/>
                        <br/>
                        <span>Availiação do anuncio:{this.state.filtro.avaliacao}</span>
                    </div>
                </div>
                <div className = "rowFiltro">
                    <p className = "nameFiltro">Preço do Anuncio:</p>
                    <div className = "colFiltro">
                        <input type = "range" min = "0" max = "1000" step = "0.01" id = "preco" name = "preco" onChange = {e => this.changeOutPut(e)}/>
                        <br/>
                        <span id = "outPut">Preço do anuncio:R${this.state.filtro.preco}</span>
                    </div>
                </div>
               
            </div>
        )


    }




    render(){
         return(
             <div>
                 {this.chooseHeader()}
                 {this.renderFiltroBar()}
                 {this.renderAnuncios()}
             </div>
         )
    }






}