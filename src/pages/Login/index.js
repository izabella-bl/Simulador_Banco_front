import React,{ useState} from "react";
import './login.css';
import {  MdLock  } from "react-icons/md";
import { RiUserLine} from "react-icons/ri";
import { HiEye, HiEyeOff } from "react-icons/hi";
import{ useHistory,withRouter} from "react-router-dom";
import {login ,Usuario} from '../../hooks/useAuth';
import axios from '../../api/axios';


const Login = () =>{

    const maskCPF = (value) => {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");
    };

    const mask = (value) => {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1$2")
          .replace(/(\d{3})(\d)/, "$1$2")
          .replace(/(\d{3})(\d{1,2})/, "$1$2")
          .replace(/(-\d{2})\d+?$/, "$1");
    };


    
   let history = useHistory()

 
    const [oldcpf, setOldCpf] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
  
   
    const handleClick = (e) => {
       e.preventDefault()
       setShow(!show);
    }

    const handleSubmit= async (e) =>{
      e.preventDefault();

      if(oldcpf === ""  ){
          alert("Preencha o campo CPF!");
      }else if(password === "" ){
        alert("Preencha o campo de senha!");
      }

      const cpf = mask(oldcpf)
      
      await axios
          .post("/login", {cpf:cpf ,  password:password })
          .then(response => {
              const token = JSON.stringify(response.data.jwt).replace(/"/g, '');
              const usuario =JSON.stringify(response.data);
              login(token);
              Usuario(usuario);
              history.push("/home")
          }).catch( (err) =>{
              if(err.response.status === 401){
                  alert("Usuário inválido! Tente novamente.")
              }
          })

      }

    return(
        <div className="login">
            <div className="login-logo">
                <h1 className="titulo1">Bem vindo(a) ao Bank!</h1>
                <h4 className="subtitulo">Crie sua conta já</h4>
                <img src="https://github.com/izabella-bl/Quiz_de_Filme_API/blob/main/cenarios/pngwing.com%20(1).png?raw=true"
               alt="MdLockLogin App"></img>
            </div>

            <form className="login-right" onSubmit={handleSubmit}>
                 <h1>Acessar App</h1>
                 
                 
                 <div className="loginInputCPF"  >
                    <RiUserLine/>
                     <input type="text" 
                     placeholder="Digite o seu CPF"
                     value={oldcpf}
                     onChange={e => setOldCpf(maskCPF(e.target.value))}
                     ></input>
                 </div>

                 <div className="loginInputSenha">
                     <MdLock/>
                     <input 
                     placeholder="Digite sua senha"
                     type={show ? "text" : "password"}
                     value={password}
                     onChange={e => setPassword(e.target.value)}></input>

                   <div className="login-eye">
                    {show ? (
                        <HiEye
                            size={20}
                            onClick={handleClick}
                        />
                        ) : (
                            <HiEyeOff
                            size={20}
                            onClick={handleClick}
                            />
                    )}
                   </div>
                 </div>
                 
                 <button type="submit">Entrar</button>

                 <h4>Não tenho conta!</h4>

                 <a  href="/cadastro">Cadastrar</a>
            </form>
            
        </div>
    );
};

export default withRouter(Login);