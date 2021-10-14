import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDoctors, deleteDoctor } from '../actions/doctorActions'

const AdminDoctorListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.doctorList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.doctorDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDoctors())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDoctor(id))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col className='mb-2 mt-4 ml-0 pl-0'>
              <h1>Doctors</h1>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col className='mb-4 mt-4 pl-0 ml-0 mr-0 pr-0'>
              <LinkContainer to={`/admin/addDoctor`} style={{ float: 'right' }}>
                <Button variant='primary' size='lg' style={{ float: 'right' }}>
                  <i className='fas fa-plus mr-2'></i>
                  New doctor
                </Button>
              </LinkContainer>
            </Col>

            <Table striped bordered hover responsive className='table-lg'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      {user.name} {user.surname}
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/doctor/${user._id}/edit`}>
                        <Button
                          variant='light'
                          className='btn-sm'
                          data-testid='newDoctorButton'
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </>
  )
}

export default AdminDoctorListScreen
