import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPatientModal from '../modals/AddPatientModal'

import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap'
import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPatients } from '../actions/patientActions'

const PatientListScreen = () => {
  const dispatch = useDispatch()

  const patientList = useSelector((state) => state.patientList)
  const { loading, error, patients } = patientList

  useEffect(() => {
    dispatch(listPatients())
  }, [dispatch])

  return (
    <>
      <h1>List of patients</h1>
      <Row className="align-items-center">
        <Col className="text-right" sm={6} md={4}>
          <InputGroup className="mb-3 mt-4" style={{ width: '20rem' }}>
            <FormControl
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
        </Col>
        <Col sm={6}>
          <AddPatientModal />
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row
          className="mt-4"
          style={{ float: 'left', display: 'inline-block' }}
        >
          {patients.map((patient) => (
            <Col sm={12}>
              <Patient key={patient._id} patient={patient} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default PatientListScreen
