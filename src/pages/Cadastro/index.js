import React, { useState } from "react";
import "./cadastro.css";
import { MdOutlineMail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdLock } from "react-icons/md";
import axios from "../../api/axios";
import { useHistory, withRouter } from "react-router-dom";
import NavBar from "./headerCadastro/headerCadastro";

const Cadastro = () => {
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

  const maskOnlyLetters = (value) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
  };

  let history = useHistory();

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldcpf, setOldCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName !== "" &&
      lastName !== "" &&
      oldcpf !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const cpf = mask(oldcpf);
      await axios
        .post("/save", { firstName, lastName, cpf, email, password })
        .then((response) => {
          history.push("/", alert("Cadastrado com sucesso!"));
        })
        .catch((err) => {
          if (!err?.response) {
            alert("No Server Response");
          } else if (err.response?.status === 406) {
            alert("CPF ou Email inválido!");
          } else if (err.response?.status === 400) {
            history.push("/", alert("Usuário já existe!"));
          }
        });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="cadastro">
        <form className="div-formulario" onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <label className="LabelCadastro">Nome</label>
          <div className="Input">
            <input
              type="text"
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setfirstName(maskOnlyLetters(e.target.value))}
            ></input>
          </div>

          <label className="LabelCadastro">Sobrenome</label>
          <div className="Input ">
            <input
              type="text"
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(maskOnlyLetters(e.target.value))}
            ></input>
          </div>

          <label className="LabelCadastro">Email</label>
          <div className="Input ">
            <MdOutlineMail />
            <input
              type="text"
              placeholder="Ex:Aline@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <label className="LabelCadastro">CPF</label>
          <div className="Input ">
            <input
              type="text"
              placeholder="Ex:000.000.000-00"
              value={oldcpf}
              onChange={(e) => setOldCpf(maskCPF(e.target.value))}
            ></input>
          </div>

          <label className="LabelCadastro">Senha</label>
          <div className="Input">
            <MdLock />
            <input
              placeholder="Digite sua senha"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <div className="login-eye">
              {show ? (
                <HiEye size={20} onClick={handleClick} />
              ) : (
                <HiEyeOff size={20} onClick={handleClick} />
              )}
            </div>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Cadastro);
