import React,{Component} from 'react';
import Axios from 'axios';
import HeaderServico from '../../components/HeaderServico/HeaderServico';
import Noimage from '../../images/No-image.jpg';

export default class AlterarAnuncio extends Component{

    state = {
        anuncio:{},
        isEmpty:true
    }


    async componentDidMount(){
        let {id_anuncio} = this.props.match.params; 
        Axios.get("http://localhost:3001/anuncioDetalhes/"+id_anuncio).then(res =>{
            console.log(res.data);
            this.setState({anuncio:res.data})
        }).catch(error =>{
            alert("Não foi possivél recuperar os dados do anuncio");
        })
    }

    save = (event) =>{
        event.preventDefault();
        const data = new FormData();
        data.append("titulo",this.state.servico.nome);
        data.append("cidade",this.state.servico.cidade);
        data.append("descricao",this.state.servico.descricao);
        data.append("horarios",this.state.servico.horarios);
        data.append("valor",parseFloat(this.state.servico.valor));
        data.append("categoria",this.state.servico.categoria);
        data.append("file",this.state.servico.foto)
        Axios.post(""+window.localStorage.getItem("id_usuario"),data).then(res =>{
            window.location.href = "http://localhost:3000/PaginaLogada";
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
        const servico = {... this.state.servico};
        servico[event.target.name] = event.target.files[0];
        this.setState({servico});
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
                                    <input type = "text" id = "nome" name = "nome" className = "input" onChange = {e => this.updateField(e)} value = {this.state.anuncio.titulo} />
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