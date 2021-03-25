import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar
        //fixed="top"
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TelemedicinePlatform</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/diseases">
                <Nav.Link>
                  <i className="fa fa-medkit"></i> Diseases
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/patients">
                <Nav.Link>
                  <i className="fa fa-users"></i> Patients
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
