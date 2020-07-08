import React from 'react';
import { withRouter } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

    const Main = (props) => {
        console.log(props);
        return(
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Deal Arena</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }

export default withRouter(Main);
