import React,{Component} from 'react';
import api from '../../services/api';
import LoginHeader from '../../components/LoginHeader/LoginHeader';

export default class CriarComprimisso extends Component{


    state = {
        anuncio:{},
        data:""
    }

    componentDidMount(){
        let id_anuncio = this.props.match.params;
        api.get('/anuncioDetalhes/'+id_anuncio).then(res => {
            this.setState({anuncio:res.data});
        }).catch(error => {
            console.log(error);
        })
    }

    render(){
        return (
            <div>
                <LoginHeader/>
            </div>
        )
    }


}