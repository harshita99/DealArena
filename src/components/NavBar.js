import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #08c; }
  a .navbar-nav .navbar-light {
    color: #f5f5f5;
    &:hover { color: black; }
  }
  .nav-link {
    color: #f5f5f5 !important;
    &:hover { color: black !important; }
  }
  .nav-item {
    color: #f5f5f5 !important; 
    &:hover { color: black !important; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: white !important;
    &:hover { color: black !important; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand>Deal Arena</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/About">About</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)

export default NavigationBar;