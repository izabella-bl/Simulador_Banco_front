import React from "react";
import { Navbar,Container,Nav} from 'react-bootstrap';
import './header.css';




const NavBar = () =>{
    return(

        <div >

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="NavBar1">
                <Container >
                <Navbar.Brand href="/home" className="BrandNav">Bank</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                    <Nav.Link href="/" variant="outline-secondary" className="btn-lg btn-outline-secondary LoginNav">Login</Nav.Link>
                    
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
    
        </div>
     )       
}


export default NavBar;