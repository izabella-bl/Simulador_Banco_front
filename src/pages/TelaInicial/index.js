import React , {useState, useEffect } from "react";
import "./home.css"
import Header from '../../header'
import {  IoIosListBox} from "react-icons/io";
import { GiPayMoney,GiReceiveMoney} from "react-icons/gi";
import { HiEye, HiEyeOff } from "react-icons/hi"
import { BsHouseDownFill } from "react-icons/bs";
import axios from '../../api/axios';


function TelaInicial(){
    
    const [saldo, setSaldo] = useState(false)
    const [show, setShow] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"));

    const id = user.id;
 
    const handleClick = (e) => {
       e.preventDefault()
       setShow(!show);
    }

    useEffect((e) => {

        axios.get("/home/"+id).then(response =>{
            setSaldo(response.data.account.balance);
        }).catch(err =>{
            alert(err)
        })
        
    });
 
    return(
         <div>
                <Header></Header> 
                <h1 className="titulo">Saldo</h1>
                 <div className="saldo">
                        <div className="loginInputSaldo">
                        <div className="cifrao">R$</div>
                        <input 
                        type={show ? "text" : "password"}
                        value={saldo}
                        ></input>

                    <div className="login-eye2">
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
                 </div>
                

                <div className="divCards">
                    <main className="cards">
                        <section className="card contact">
                            <div className="icon">
                                <GiPayMoney  style={{width:"100%" ,height:"90px",color:"#9F66FF"}}/>
                            </div>
                            <h3>Transferência</h3>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            <a href="/transferir">Transferir</a>
                        </section>
                        <section className="card shop">
                            <div className="icon">
                                <GiReceiveMoney style={{width:"100%" ,height:"90px",color:"#3E8AFF"}}/>
                            </div>
                            <h3>Receber</h3>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            <a href="#">Receber</a>
                        </section>
                        <section className="card about">
                            <div className="icon">
                                <IoIosListBox style={{width:"100%" ,height:"90px",color:"#FE5F8F"}}/>
                            </div>
                            <h3>Extrato</h3>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            <a href="Extrato">Extrato</a>
                        </section>
                        <section className="card road">
                            <div className="icon">
                                <BsHouseDownFill style={{width:"100%" ,height:"90px",color:"#FE945F"}}/>
                            </div>
                            <h3>Modo Rua</h3>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            <a href="Modo Rua">Modo Rua</a>
                        </section>
                    </main>
                </div>
                
         </div>
          
    )
}

export default TelaInicial;