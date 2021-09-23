import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listPatientsByDisease,
  listPatientsAndDiseases,
} from '../actions/patientActions'

const PatientsByDisease = ({ history, match }) => {
  const [patientAndDiseases, setPatientAndDiseases] = useState('')

  const dispatch = useDispatch()

  const patientListByDisease = useSelector(
    (state) => state.patientByDiseaseList,
  )
  const { loading, error, patients } = patientListByDisease

  const patientList = useSelector((state) => state.patientsAndDiseasesList)
  const {
    loading: loadingPatientsAndDiseases,
    error: errorPatientsAndDiseases,
    patients: patientsAndDiseases,
  } = patientList

  useEffect(() => {
    dispatch(listPatientsByDisease(match.params.id))
    // .then(() => {
    //   dispatch(listPatientsAndDiseases())
    // })
  }, [dispatch, match])

  useEffect(() => {
    dispatch(listPatientsAndDiseases())
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
          {patientsAndDiseases.map((patient) => (
            <Col sm={12} key={patient._id}>
              {patients.filter((e) => e.patient._id === patient._id).length >
              0 ? (
                <>
                  <Patient key={patient._id} patient={patient} />
                </>
              ) : (
                <></>
              )}
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

export default PatientsByDisease
