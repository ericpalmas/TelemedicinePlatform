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
import {
  listPatients,
  listPatientsAndDiseases,
} from '../actions/patientActions'
import { listDoctorPatients } from '../actions/doctorActions'
import { listPatientsSurveyResponses } from '../actions/responsesActions'

const PatientListScreen = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const doctorPatientList = useSelector((state) => state.doctorPatientList)
  const { loading, error, doctorPatients } = doctorPatientList

  const patientDelete = useSelector((state) => state.patientDelete)
  const {
    loading: loadingDeletePatient,
    error: errorDeletePatient,
    success: successDeletePatient,
  } = patientDelete

  const patientAndDiseasesList = useSelector(
    (state) => state.patientsAndDiseasesList
  )
  const {
    loading: loadingPatientAndDiseases,
    error: errorPatientAndDiseases,
    patients: patientAndDiseases,
  } = patientAndDiseasesList

  const patientsResponsesList = useSelector(
    (state) => state.patientsResponsesList
  )
  const {
    loading: loadingResponses,
    error: errorResponses,
    responses,
  } = patientsResponsesList

  var userInfo = localStorage.getItem('userInfo') || 'noUserInfoSaved'

  const [patientElaborated, setPatientElaborated] = useState([])

  useEffect(() => {
    dispatch(listPatientsAndDiseases())
  }, [dispatch, successDeletePatient])

  useEffect(() => {
    if (userInfo !== 'noUserInfoSaved') {
      dispatch(listDoctorPatients(userInfo.split('"')[3]))
    }
  }, [dispatch, userInfo, successDeletePatient])

  useEffect(() => {
    if (userInfo !== 'noUserInfoSaved') {
      dispatch(listPatientsSurveyResponses(userInfo.split('"')[3]))
      console.log(responses)
    }
  }, [dispatch])

  useEffect(() => {
    setPatientElaborated([])
    if (patientAndDiseases && doctorPatients) {
      if (!loading && !loadingPatientAndDiseases) {
        patientAndDiseases.forEach((patient) => {
          if (doctorPatients.find((x) => x.patient._id === patient._id)) {
            setPatientElaborated((state) => [...state, patient])
          }
        })
      }
    }
  }, [
    patientAndDiseases,
    doctorPatients,
    patientElaborated !== undefined ? patientElaborated.length : 0,
  ])

  return (
    <>
      <h1>List of patients</h1>

      {userInfo !== 'noUserInfoSaved' ? (
        <>
          <Row className='align-items-center'>
            <Col className='text-right' sm={6} md={4}>
              <InputGroup className='mb-3 mt-4' style={{ width: '20rem' }}>
                <FormControl
                  placeholder='Search'
                  aria-label="Recipient's username"
                  aria-describedby='basic-addon2'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
            <Message variant='danger'>{errorPatientAndDiseases}</Message>
          ) : (
            <Row
              className='mt-4'
              style={{ float: 'left', display: 'inline-block' }}
            >
              {patientElaborated
                .filter(
                  (patient) =>
                    (patient.name !== null &&
                      patient.name
                        .toLowerCase()
                        .includes(search.toLowerCase())) ||
                    (patient.surname !== null &&
                      patient.surname
                        .toLowerCase()
                        .includes(search.toLowerCase()))
                )
                .map((patient) => (
                  <Col sm={12} key={patient._id}>
                    <Patient key={patient._id} patient={patient} />
                  </Col>
                ))}
            </Row>
          )}
        </>
      ) : (
        <>
          <p>You have to do the login to see these data</p>
        </>
      )}
    </>
  )
}

export default PatientListScreen
