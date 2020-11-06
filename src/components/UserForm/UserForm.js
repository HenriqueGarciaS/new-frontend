import React,{Component} from 'react';
import './UserForm.css';
import user from '../../images/No-user.png';
import api from '../../services/api';
import hash from '../../services/hash';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const numeroRegex = RegExp(
    /\(\d{2,}\)\d{4,}\-\d{4}/
  );

export default class UserForm extends Component{
    state = {
        usuario:{},
        newFoto:"",
        isEmpty:false,
        telephoneValid:true,
        emailValid:true,
        passwordValid:false
    }

    async componentDidMount(){
        let id = localStorage.getItem("id_usuario")
        api.get('/usuario/'+id).then(res =>{
         this.setState({usuario:res.data});}
        ).catch(error =>{
            alert("Erro ao recuperar dados do usuario");
        }) 
    }

    save(event){
        event.preventDefault();
        const data = new FormData();
        data.append("file",this.state.newFoto);
        data.append("nome",this.state.usuario.nome);
        data.append("sobrenome",this.state.usuario.sobrenome);
        data.append("estado",this.state.usuario.estado);
        data.append("telefone",this.state.usuario.telefone)
        data.append("cidade",this.state.usuario.cidade);
        data.append("email",this.state.usuario.email);
        data.append("senha",hash(this.state.usuario.senha));
        if(localStorage.getItem('tokenAuth'))
        data.append("tokenAuth",localStorage.getItem('tokenAuth'))
        else
        data.append("tokenAuth",sessionStorage.getItem('tokenAuth'));
        api.post("/updateUsuario/"+localStorage.getItem("id_usuario"),data).then(res =>{
            window.location.reload();
            localStorage.setItem("foto_usuario",res.data.foto);
            localStorage.setItem("nome_usuario",res.data.nome);
        }).catch(res => { 
            window.alert("Não foi possivel fazer o cadastro, por favor tente novamente");    
        })

    }

    updateField(event){
        const usuario  = {...this.state.usuario};
        let isEmpty = false;
        usuario[event.target.name] = event.target.value;
        if(usuario.nome === "" || usuario.sobrenome === ""  || usuario.estado === "" || usuario.cidade === "")
        isEmpty = true;
        this.setState({usuario,isEmpty});
    }

    validateEmail(event){
        const usuario = {...this.state.usuario};
        let emailValid = true;
        usuario[event.target.name] = event.target.value;
        if(usuario.email === "" || !emailRegex.test(usuario.email)){
        emailValid = false;
        document.getElementById('lblemail').style.color = "red";
        document.getElementById("lblemail").innerHTML = "E-mail:* (Deve se seguir o exemplo 'teste@teste.com)'";
        }
        else{
        document.getElementById("lblemail").innerHTML = "E-mail:*"
        document.getElementById("lblemail").style.color = "black";
        }
        this.setState({usuario,emailValid});
    }

    validatePhone(event){
        const usuario = {...this.state.usuario};
        let telephoneValid = true;
        usuario[event.target.name] = event.target.value;
        if(usuario.telefone === "" || !numeroRegex.test(usuario.telefone)){
            telephoneValid = false;
            document.getElementById('lbltelefone').innerHTML = "Telefone:* (Deve se seguir o exemplo (11)1111-1111)";
            document.getElementById('lbltelefone').style.color = "red";
        }
        else{
            document.getElementById('lbltelefone').innerHTML = "Telefone:*";
            document.getElementById('lbltelefone').style.color = "black";
        }

        this.setState({usuario,telephoneValid});

    }

    validatePassword(event){
        const usuario = {...this.state.usuario};
        let passwordValid = false;
        usuario[event.target.name] = event.target.value
        if((usuario.senha !== "" && usuario.confirmSenha !== "") && (usuario.senha === usuario.confirmSenha)){
        document.getElementById("lblsenha").innerHTML = "Senha:*";
        document.getElementById("lblsenha").style.color = "black";
        passwordValid = true;
        }
        else{
        document.getElementById("lblsenha").innerHTML = "Senha:* (As duas senhas não são iguais)"
        document.getElementById("lblsenha").style.color = "red";
        }
        this.setState({usuario,passwordValid});
    }

    displayImg(event){
        let img = document.getElementById("fotoUsuarioForm");
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

   
    render(){
        let src
        if(localStorage.getItem("foto_usuario") == "")
        src = user;
        else
        src = 'http://localhost:3001/'+localStorage.getItem('foto_usuario'); 
        return (<div className = "formArea">
        <p className = "titulo">Editar dados cadastrais</p>
            <form method = "POST" onSubmit = {event => this.save(event)}>
                <div className = "row">
                    <div className = "col">
                    <label for = "nome" id = "lblNome" className = "labelForm">Nome:*</label>
                    <input type = "text" id = "nome" name = "nome" className = "input" value = {this.state.usuario.nome} onChange = {event => this.updateField(event)}/>
                    </div>
                    <div className = "col">
                    <label for = "sobrenome" id ="lblSobrenome" className = "labelForm">Sobrenome:*</label>
                    <input typee = "text" id = "sobrenome" name = "sobrenome" className = "input" value = {this.state.usuario.sobrenome} onChange = {event => this.updateField(event)}/> 
                    </div>
                </div>
                <div className = "row">
                    <div className = "col">
                    <label for = "estado" id = "lblEstado" className = "labelForm">Estado:*</label>
                    <select name = "estado" id = "estado" className = "input" onChange = {event => this.updateField(event)}>
                    <option disabled = "true" selected = "true">{this.state.usuario.estado}</option>
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
            </div>
            <div className = "col">
                <label for = "cidade" id = "lblCidade" className = "labelForm">Cidade:*</label>
                <input type = "text" id = "cidade" name = "cidade" className = "input" value = {this.state.usuario.cidade} onChange = {event => this.updateField(event)}/>
            </div>
        </div>
        <div className = "row">
            <div className = "col">
                <label for = "email" id = "lblemail" className = "labelForm">E-mail:*</label>
                <input type = "email" id = "email" name = "email" className = "input" value = {this.state.usuario.email}  onChange = {event => this.validateEmail(event)}/>
            </div>
            <div className = "col">
                <label for = "fone" id = "lbltelefone" className = "labelForm">Telefone:*</label>
                <input type = "text" id = "fone" name = "telefone" className = "input" value = {this.state.usuario.telefone} onChange = {event => this.validatePhone(event)}/>
            </div>
        </div>
        <div className = "row" id = "segundaSenha">
            <div className = "col">
                <label for = "senha" id = "lblsenha" className = "labelForm">Senha:*</label>
                <input type = "password" id = "senha" name = "senha" className ="input"  onChange = {event => this.validatePassword(event)}/>
            </div>
            <div className = "col">
                <label for = "confirmSenha" id = "lblconfirmSenha" className = "labelForm">Confirmar Senha:*</label>
                <input type = "password" id = "confirmSenha" name = "confirmSenha" className = "input" onChange = {event => this.validatePassword(event)}/>
            </div>
        </div>
        <div className = "row">
            <div className = "col">
                <label for = "foto" id = "labelFoto" className = "labelForm">Foto de Perfil:</label>
                <input type = "file" id = "foto" name = "foto" accept = "image/*" onChange = {event => this.fileSelect(event)}/>
                <img id = "fotoUsuarioForm" src = {src}/>
            </div>
        </div>
        <div className = "btn-area">
                        <button type = "submit" id="btn" disabled = {this.state.isEmpty || !this.state.emailValid || !this.state.telephoneValid || !this.state.passwordValid}>Cadastrar</button>
        </div>
        </form>
        </div>);
    }
}