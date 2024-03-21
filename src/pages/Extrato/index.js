import React,{ useState} from "react";
import {Table,Card ,Form,Button,FormControl} from 'react-bootstrap';
import Header from '../../header'
import axios from '../../api/axios';

function Extrato () {

    const [month, setMonth] = useState("");
    const [historico,setHistorico] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("user"));
    
    const handleClick  = (e) =>{
        e.preventDefault();
        const id = usuario.id;
        axios.get("/history/month?month="+month+"&userId="+id)
        .then(response =>{
        setHistorico(response.data);
            
        }).catch(err =>{
             alert(err);
        })
    }
    

    return(
        <div>
            <Header></Header>
    
            <Card className="mx-auto" style={{ width: '90rem' }}>
                <Form className="d-flex" style={{padding: "10px"}} >
                    <FormControl
                        type="search"
                        placeholder="mês"
                        className="me-2"
                        aria-label="Search"
                        value={month}
                        onChange={e => setMonth(e.target.value)}
                        />
                    <Button variant="outline-success" onClick={handleClick}>Pesquisar</Button>
                </Form>
                <Card.Body>
                <Card.Title style={{fontSize: "30px",marginBottom:"10px"}}>Extrato</Card.Title>
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Saldo Final</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historico.map(historico => (
                        <tr>
                            <td>{historico.created_At}</td>
                            <td>{historico.description}</td>
                            <td>R${historico.value},00</td>
                            <td>R${historico.balance},00</td>
                        </tr>
                         ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
             
        </div>

    )
}

export default Extrato;