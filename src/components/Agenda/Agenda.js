import React,{Component} from 'react';
import api from '../../services/api';
import './Agenda.css'




export default class Agenda extends Component{

    state = {
        compromissos:[]
    }

    componentDidMount(){
        api.get('/agenda/'+localStorage.getItem('id_usuario')).then(res => {
            this.setState({compromissos:res.data});
        }).catch(error => {
            console.log('erro');
        })
    }

    renderData = () => {
        return (
            this.state.compromissos.map(compromisso => {
                return (
                <tr>
                <td className = "dadoColuna">{compromisso.nome_anuncio}</td>
                <td className = "dadoColuna">{compromisso.data}</td>
                </tr>
                ) 
            })
        )
    }

    renderAgenda = () => {
       return (
      
        <div className = "tableArea"> 
            <div id = "tituloPagina">
            <p id = "titulo">Agenda:</p>
            </div>
            <table className = "tabela">
                <tr>
                    <th className = "nomeColuna">Nome do Serviço:</th>
                    <th className = "nomeColuna">Data:</th>
                </tr>
                {this.renderData()}
            </table>
        </div>
        );
    }

    render(){
        return (
              
                this.renderAgenda()
            
        )
    }

}
