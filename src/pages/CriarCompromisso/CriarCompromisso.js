import React,{Component} from 'react';
import api from '../../services/api';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import './CriarCompromisso.css';




export default class CriarComprimisso extends Component{


    state = {
        Anuncio:{},
        data:"",
        hora:"",
        minuto:"",
        isEmpty:true
    }

    componentDidMount(){
        let {id_anuncio} = this.props.match.params
        api.get('/anuncioDetalhes/'+id_anuncio).then(res => {
            console.log(res.data)
            this.setState({Anuncio:res.data});
        }).catch(error => {
            console.log(error);
        })
    }


    updateField = (event) =>{
        this.setState({data:event.target.value});
        if(this.state.hora != "" && this.state.minuto != "" && this.state.data != "")
        this.setState({isEmpty:false});
    }

    updateTime = (event) => {
        
        if(event.target.name == "hora")
        this.setState({hora:event.target.value});
        else
        this.setState({minuto:event.target.value});

        if(this.state.hora != "" && this.state.minuto != "" && this.state.data != "")
        this.setState({isEmpty:false});
        

    }

    tratarData = (str) =>{
         let newData = str.split('-');
         return newData[2]+'-'+newData[1]+'-'+newData[0];
    }

    save = (event) =>{
        let tokenAuth;
        if('tokenAuth' in sessionStorage)
        tokenAuth = sessionStorage.getItem('tokenAuth');
        else
        tokenAuth = localStorage.getItem('tokenAuth');
        event.preventDefault();
        let data = {
            data:this.tratarData(this.state.data),
            nome_anuncio:this.state.Anuncio.titulo,
            id_usuario:localStorage.getItem('id_usuario'),
            horario : this.state.hora+":"+this.state.minuto,
            tokenAuth:tokenAuth,
            id_anuncio:this.props.match.params.id_anuncio
        };
        console.log(data);
        api.post('/criaCompromisso',data).then(res => {
            if(res.data != 'horario já em uso'){
            alert('Compromisso agendado com sucesso');
            window.location.href = '/';
            }
            else
            alert('horario já em uso, escolha outro horario');
        }).catch(error =>{
            alert(error.data);
        })
        
        

    }


    renderForm = () =>{
        return (
        <form method = "POST" onSubmit = {e => this.save(e)}>
        <div className = "row">
            <div className = "col">
                <label for = "nome" className = "labelForm">Nome do anuncio:</label>
                <input type = "text" disabled = "true" className = "input" value = {this.state.Anuncio.titulo}/>
            </div>
        </div>
        <div className = "row">
            <div className = "col">
                <label for = "data" className = "labelForm">Escolha uma data para o compromisso:</label>
                <input type = "date" name = "data" onChange = {e => this.updateField(e)}/>
            </div>
            <div className = "col">
            <label for = "horario" className = "labelForm">Escolha um horario para o compromisso:</label>    
            <input type = "number" className = "time" name = "hora" min = '0' max = '23' step = '1' onChange = {e => this.updateTime(e)}/>
            <span>:</span>
            <input type = "number" name = 'minuto' className = "time" min = '0' max = '59' step = '1'  onChange = {e => this.updateTime(e)}/>
            </div> 
        </div>
        <div className = "btn-area">
            <button type = "submit" id="btn" disabled = {this.state.isEmpty}>Agendar</button>
        </div>
        </form>)
    }

    render(){
        return (
            <div>
                <LoginHeader/>
                {this.renderForm()}
            </div>
        )
    }


}