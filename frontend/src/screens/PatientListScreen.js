import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
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

      <InputGroup className="mb-3 mt-4" style={{ width: '20rem' }}>
        <FormControl
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
      </InputGroup>

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
            <Col sm={12} md={6} lg={4}>
              <Patient patient={patient} />
            </Col>
          ))}
        </Row>
      )}

      <div className="mt-4" style={{ float: 'left', display: 'inline-block' }}>
        <Button variant="primary" size="lg">
          New patient
        </Button>{' '}
        <Button variant="primary" size="lg">
          Remove patient
        </Button>
      </div>
    </>
  )
}

export default PatientListScreen
