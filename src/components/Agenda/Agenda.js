import React,{Component} from 'react';
import api from '../../services/api';




export default class Agenda extends Component{

    state = {
        compromissos:[]
    }

    componentDidMount(){
        api.get('/agenda/'+localStorage.getItem('id_usuario')).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log('erro');
        })
    }

    render(){
        return (
            <div>

            </div>
        )
    }

}
