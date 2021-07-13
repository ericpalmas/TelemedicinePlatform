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
import { listSurveyResponses } from '../actions/surveyActions'

const AdminSurveyListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const patientList = useSelector((state) => state.patientList)
  const { loading, error, patients } = patientList

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const patientDelete = useSelector((state) => state.patientDelete)
  const { success: successDelete } = patientDelete

  const surveysResponsesList = useSelector((state) => state.surveyResponses)
  const {
    loading: loadingResponses,
    error: errorResponses,
    surveysResponses,
  } = surveysResponsesList

  // success delete va passato come dipendeza cosi quando cambia viene rieffettuato lo use effect
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listSurveyResponses())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //dispatch(deletePatient(id))
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
              <h1>Surveys</h1>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Table striped bordered hover responsive className="table-lg">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>SURVEY</th>
                  <th>CREATION DATE</th>
                  <th>UPDATE DATE</th>
                  <th>TO</th>
                  <th>RESPONSE</th>
                </tr>
              </thead>
              <tbody>
                {surveysResponses.map((response) => (
                  <tr key={response._id}>
                    <td>{response._id}</td>

                    {response.survey ? (
                      <td>{response.survey.name}</td>
                    ) : (
                      <td></td>
                    )}
                    <td>{response.createdAt.substring(0, 10)}</td>
                    <td>{response.updatedAt.substring(0, 10)}</td>
                    {response.patient ? (
                      <td>
                        {response.patient.name} {response.patient.surname}
                      </td>
                    ) : (
                      <td></td>
                    )}

                    <td>
                      {response.response ? (
                        <i
                          className="fas fa-check"
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
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

export default AdminSurveyListScreen
