import React,{Component} from 'react';
import api from '../../services/api';
import HeaderServico from '../../components/HeaderServico/HeaderServico';
import Noimage from '../../images/No-image.jpg';
import socket from '../../socketConfig.js';


export default class AlterarAnuncio extends Component{

    state = {
        anuncio:{},
        newFoto:"",
        isEmpty:false
    }


    async componentDidMount(){
        let {id_anuncio} = this.props.match.params; 
        socket.emit('usuarioConectado',localStorage.getItem('nome_usuario'));
        api.get("/anuncioDetalhes/"+id_anuncio).then(res =>{
            console.log(res.data);
            this.setState({anuncio:res.data})
        }).catch(error =>{
            alert("Não foi possivél recuperar os dados do anuncio");
        })
    }

    save = (event) =>{
        event.preventDefault();
        const data = new FormData();
        data.append("titulo",this.state.anuncio.titulo);
        data.append("cidade",this.state.anuncio.cidade);
        data.append("descricao",this.state.anuncio.descricao);
        data.append("horarios",this.state.anuncio.horarios);
        data.append("valor",parseFloat(this.state.anuncio.valor));
        data.append("categoria",this.state.anuncio.categoria);
        data.append("file",this.state.newFoto)
        if(localStorage.getItem('tokenAuth'))
        data.append("tokenAuth",localStorage.getItem('tokenAuth'));
        else
        data.append("tokenAuth",sessionStorage.getItem('tokenAuth'));
        data.append("id_usuario",localStorage.getItem("id_usuario"));
        api.post("/updateAnuncio/"+this.state.anuncio.id,data).then(res =>{
            window.location.href = "http://localhost:3000/PaginaUsuario";
        }).catch(res=>{
            console.log(res);
            window.alert("Não foi possivel cadastar o serviço, por favor tente novamente");
        })
    }

    updateField = (event) =>{
        const anuncio = {...this.state.anuncio};
        let isEmpty = false;
        anuncio[event.target.name] = event.target.value;
        if(anuncio.nome === "" || anuncio.cidade === "" || anuncio.descricao === "" || anuncio.horarios === "" || anuncio == "" || anuncio.categoria === "")
        isEmpty = true;
        this.setState({anuncio,isEmpty});
    }

    displayImg(event){
        let img = document.getElementById("anuncio");
        if(event.target.files.length !== 0)
        img.src = URL.createObjectURL(event.target.files[0]);
        else
        img.src = "";
    }

    fileSelect(event){
        let foto  = event.target.files[0];
        this.setState({newFoto:foto});
        this.displayImg(event);
    }

    renderForm = () => {
        return(
            <div>
                <div className = "Pagina-CadastrarServico">
                    <p>Criar novo anuncio de serviço</p>
                    <div className = "form-area">
                        <form method = "POST" onSubmit = {e => this.save(e)}>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "nome" id = "lblnome" className = "labelForm">Nome do serviço:*</label>
                                    <input type = "text" id = "nome" name = "titulo" className = "input" onChange = {e => this.updateField(e)} value = {this.state.anuncio.titulo} />
                                </div>
                                <div className = "col">
                                    <label for = "cidade" id = "lblcidade" className = "labelForm">Cidade do serviço:*</label>
                                    <input type = "text" id = "cidade" name = "cidade" className = "input" onChange = {e => this.updateField(e)} value = {this.state.anuncio.cidade}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "descricao" id = "lbldescricao" className = "labelForm">Descrição:*</label>
                                    <textarea id = "descricao" name = "descricao" className = "input" onChange = {e => this.updateField(e)} value = {this.state.anuncio.descricao}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "horarios" id = "lblhorarios" className = "labelForm">Horarios Disponiveis:*</label>
                                    <input type = "text" id = "horarios" name = "horarios" className = "input" onChange = {e => this.updateField(e)} value = {this.state.anuncio.horarios}/>
                                </div>
                                <div className = "col">
                                    <label for = "valor" id = "lblvalor" className = "labelForm">Valor:*</label>
                                    <input type = "number" id = "valor" name = "valor" className = "input"  min = "1" max = "100000"  step = "0.01" onChange = {e => this.updateField(e)} value = {this.state.anuncio.valor}/>
                                </div>
                                <div className = "col">
                                    <label for = "categoria" id = "lblcategoria" className = "labelForm">Categoria</label>
                                    <select id = "categoria" className = "input" name = "categoria" onChange = {e => this.updateField(e)}>
                                    <option disabled selected>{this.state.anuncio.categoria}</option>
                                    <option value = "faxina">Faxina</option>
                                    <option value = "conserto">Conserto</option>
                                    <option value = "pintura">Pintura</option>
                                    <option value = "Professor">Professor</option>
                                    <option value = "jardinheiro">Jardinheiro</option>
                                    <option value = "encanador">Encanador</option>
                                    </select>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label for = "foto" id = "fotoAnuncio" className = "labelForm">Foto para o Anuncio:</label>
                                    <input type = "file" id = "foto" name = "foto" accept = "image/*" onChange = {e => this.fileSelect(e)}/>
                                    <img  id = "anuncio" src = {"http://localhost:3001/"+this.state.anuncio.imagem}/>
                                </div>
                            </div>
                            <div className = "btn-area">
                                <button type = "submit" id="btn" disabled = {this.state.isEmpty}>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div>
                <HeaderServico/>
               {this.renderForm()}
            </div>
        )
    }
    






}