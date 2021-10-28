import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/doctorActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand data-testid='title'>
              TelemedicinePlatform
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <LinkContainer to='/diseases'>
                <Nav.Link data-testid='diseases' href='/diseases'>
                  <i className='fa fa-medkit'></i> Diseases
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to='/patients'>
                <Nav.Link data-testid='patients' href='/patients'>
                  <i className='fa fa-users'></i> Patients
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to='/studies'>
                <Nav.Link data-testid='studies' href='/studies'>
                  <i class='fa fa-stethoscope' aria-hidden='true'></i> Studies
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to='/surveyCreation'>
                <Nav.Link data-testid='patients' href='/patients'>
                  <i className='fa fa-poll-h'></i> Survey creations
                </Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/doctorlist'>
                    <NavDropdown.Item>Doctors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/patientList'>
                    <NavDropdown.Item>Patients</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/diseaseList'>
                    <NavDropdown.Item>Diseases</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/surveyList'>
                    <NavDropdown.Item>Surveys</NavDropdown.Item>
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
