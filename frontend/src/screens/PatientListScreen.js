import React, { useEffect, useState } from 'react'
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
import { listPatients, listPatientsAndDisease } from '../actions/patientActions'
import { listDoctorPatients } from '../actions/doctorActions'

const PatientListScreen = () => {
  const dispatch = useDispatch()

  const doctorPatientList = useSelector((state) => state.doctorPatientList)
  const { loading, error, doctorPatients } = doctorPatientList

  const patientAndDiseasesList = useSelector(
    (state) => state.patientsAndDiseaseList,
  )
  const {
    loading: loadingPatientAndDiseases,
    error: errorPatientAndDiseases,
    patients: patientAndDiseases,
  } = patientAndDiseasesList

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  const [patientElaborated, setPatientElaborated] = useState([])

  useEffect(() => {
    dispatch(listPatientsAndDisease())
  }, [dispatch])

  useEffect(() => {
    dispatch(listDoctorPatients(userInfo._id))
  }, [dispatch])

  useEffect(() => {
    setPatientElaborated([])
    if (!loading && !loadingPatientAndDiseases) {
      patientAndDiseases.forEach((patient) => {
        if (doctorPatients.find((x) => x.patient._id === patient._id)) {
          setPatientElaborated((state) => [...state, patient])
        }
      })
    }
  }, [patientAndDiseases, doctorPatients, patientElaborated.length])

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

      {loadingPatientAndDiseases ? (
        <Loader />
      ) : errorPatientAndDiseases ? (
        <Message variant="danger">{errorPatientAndDiseases}</Message>
      ) : (
        <Row
          className="mt-4"
          style={{ float: 'left', display: 'inline-block' }}
        >
          {patientElaborated.map((patient) => (
            <Col sm={12} key={patient._id}>
              <Patient key={patient._id} patient={patient} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default PatientListScreen
