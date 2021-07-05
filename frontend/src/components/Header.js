import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/doctorActions'
//import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
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
                <Nav.Link href="/diseases">
                  <i className="fa fa-medkit"></i> Diseases
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/patients">
                <Nav.Link href="/patients">
                  <i className="fa fa-users"></i> Patients
                </Nav.Link>
              </LinkContainer>
            </Nav>

            {/* <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav> */}

            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className="ml-auto">
              {/* <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer> */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Doctors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Patients</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
