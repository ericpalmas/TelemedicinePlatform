import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getDoctorDetails, updateDoctorProfile } from '../actions/doctorActions'
import { DOCTOR_UPDATE_PROFILE_RESET } from '../constants/doctorConstants'
import { listSurveyResponsesByDoctor } from '../actions/surveyActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.doctorDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.doctorUpdateProfile)
  const { success } = userUpdateProfile

  const surveysResponsesList = useSelector(
    (state) => state.surveyResponsesByDoctor,
  )
  const {
    loading: loadingResponses,
    error: errorResponses,
    surveysResponses,
  } = surveysResponsesList

  const surveyPatientAssignment = useSelector(
    (state) => state.surveyPatientAssignment,
  )
  const {
    loading: loadingSurveyPatientAssignment,
    error: errorSurveyPatientAssignment,
    success: successSurveyPatientAssignment,
    assignments,
  } = surveyPatientAssignment

  //surveyResponses

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || !user.surname || success) {
        dispatch({ type: DOCTOR_UPDATE_PROFILE_RESET })
        dispatch(getDoctorDetails('profile'))
        dispatch(listSurveyResponsesByDoctor(userInfo._id))
      } else {
        setName(user.name)
        setSurname(user.surname)
        setEmail(user.email)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    user,
    success,
    successSurveyPatientAssignment,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateDoctorProfile({ id: user._id, name, surname, email, password }),
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>

      {/* In questa tabella vengono visualizzate le operazioni effettuate dal dottore, i questionari assegnati a chi */}

      <Col md={9}>
        <h2>Surveys sended</h2>
        {loadingResponses ? (
          <Loader />
        ) : errorResponses ? (
          <Message variant="danger">{errorResponses}</Message>
        ) : (
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
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
