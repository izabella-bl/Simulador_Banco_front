import React, {useState} from "react";
import { Navbar,Container,Offcanvas,Nav,Button} from 'react-bootstrap';
import {  FaGripLines ,FaUserCircle  } from "react-icons/fa";
import {  IoMdNotifications, IoIosListBox} from "react-icons/io";
import { ImExit} from "react-icons/im";
import { AiFillHome} from "react-icons/ai";
import { GiPayMoney,GiReceiveMoney} from "react-icons/gi";
import{MdOutlineHelp}  from "react-icons/md";
import {logout} from './hooks/useAuth';
import{ useHistory} from "react-router-dom";

const Header = (props) =>{
    
    let history = useHistory();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
    const handleLogout = async () => {      
        logout();
        history.push("/");
    }


    return(
        <Navbar className="navbar-dark" bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand  style={{ fontSize: '25px'  }} >
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '90px' }}
                navbarScroll
                >
                <Nav.Link href="#home">
                    <FaGripLines onClick={handleShow} style={{ fontSize: '25px' }} className="me-2"/></Nav.Link>
                    <Offcanvas show={show} onHide={handleClose} {...props}>
                        <Offcanvas.Header closeButton>
                             <Offcanvas.Title style={{ fontSize: '25px' }}>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-4" style={{ fontSize: '20px' }} >
                                <Nav.Link href="/home"><AiFillHome style={{ width: '26px'}} /> Home</Nav.Link> 
                                <Nav.Link href="#action2"><FaUserCircle style={{ paddingRight:"5px", width: '30px'}}/>Perfil</Nav.Link>
                                <Nav.Link href="/transferir"><GiPayMoney style={{ paddingRight:"5px", width: '30px'}}/>Transferir</Nav.Link>
                                <Nav.Link href="#action2"><GiReceiveMoney style={{ paddingRight:"5px", width: '30px'}}/>Receber</Nav.Link>
                                <Nav.Link href="/extrato"><IoIosListBox style={{ paddingRight:"5px", width: '30px'}}/>Extrato</Nav.Link>
                                <Nav.Link href="#action2"><MdOutlineHelp style={{ paddingRight:"5px", width: '30px'}}/>Ajuda</Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>Sair <ImExit/></Button> 
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas> 
                </Nav>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">

                <Nav className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll>
                    <Navbar.Brand style={{ fontSize: '25px' , paddingTop:"10px" }} > Bank</Navbar.Brand>
                </Nav>
                
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <FaUserCircle style={{ fontSize: '30px' }} />
                        <a style={{ fontSize: '15px',marginLeft: '10px', paddingTop: '3px'}} >User</a>
                        <IoMdNotifications  style={{ fontSize: '30px',marginLeft: '60px' }}/>
                    </Navbar.Text>
                    
                </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;