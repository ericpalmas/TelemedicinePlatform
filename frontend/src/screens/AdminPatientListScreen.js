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

import { listPatients, deletePatient } from '../actions/patientActions'

const AdminPatientListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const patientList = useSelector((state) => state.patientList)
  const { loading, error, patients } = patientList

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const patientDelete = useSelector((state) => state.patientDelete)
  const { success: successDelete } = patientDelete

  // success delete va passato come dipendeza cosi quando cambia viene rieffettuato lo use effect
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPatients())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatient(id))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col className="mb-2 mt-4 ml-0 pl-0">
              <h1>Patients</h1>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Table striped bordered hover responsive className="table-lg">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DATE OF BIRTH</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient._id}</td>
                    <td>
                      {patient.name} {patient.surname}
                    </td>
                    <td>{patient.age}</td>
                    <td>
                      <LinkContainer to={`/admin/patient/${patient._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(patient._id)}
                      >
                        <i className="fas fa-trash"></i>
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

export default AdminPatientListScreen
