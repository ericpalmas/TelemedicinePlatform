import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { patientsByStudylist } from '../actions/studyActions'
import { listPatientsAndDiseases } from '../actions/patientActions'

const PatientListByStudy = ({ history, match }) => {
  const dispatch = useDispatch()

  const patientsByStudyList = useSelector((state) => state.patientsByStudyList)
  const { loading, error, patients } = patientsByStudyList

  const patientAndDiseasesList = useSelector(
    (state) => state.patientsAndDiseasesList
  )
  const {
    loading: loadingPatientsAndDiseases,
    error: errorPatientsAndDiseases,
    patients: patientsAndDiseases,
  } = patientAndDiseasesList

  const [search, setSearch] = useState('')

  //   const patientListByDisease = useSelector(
  //     (state) => state.patientByDiseaseList
  //   )
  //   const { loading, error, patients } = patientListByDisease

  var userInfo = localStorage.getItem('userInfo') || 'noUserInfoSaved'

  const userLogin = useSelector((state) => state.doctorLogin)
  const {
    loading: loginLoading,
    error: loginError,
    userInfo: user_info,
  } = userLogin

  useEffect(() => {
    if (userInfo !== 'noUserInfoSaved') {
      dispatch(patientsByStudylist(match.params.id))
    }
  }, [dispatch, match])

  useEffect(() => {
    if (userInfo !== 'noUserInfoSaved') {
      dispatch(listPatientsAndDiseases())
    }
  }, [dispatch])

  useEffect(() => {
    console.log(patients)
    console.log(patientsAndDiseases)
  }, [dispatch, patients, patientsAndDiseases])

  return (
    <>
      <h1>List of patients</h1>

      {userInfo !== 'noUserInfoSaved' ? (
        <>
          <InputGroup className='mb-3 mt-4' style={{ width: '20rem' }}>
            <FormControl
              placeholder='Search'
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          {loading && loadingPatientsAndDiseases ? (
            <Loader />
          ) : error || errorPatientsAndDiseases ? (
            <Message variant='danger'>ERROR</Message>
          ) : (
            <Row
              className='mt-4'
              style={{ float: 'left', display: 'inline-block' }}
            >
              {patientsAndDiseases
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
                  <Col sm={12}>
                    {patients.filter((e) => e.patient._id === patient._id)
                      .length > 0 ? (
                      <>
                        <Patient patient={patient} />
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                ))}

              {/* {patientsAndDiseases && patients ? (
                <>
                  {patientsAndDiseases
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
                        {patients.filter((e) => e.patient._id === patient._id)
                          .length > 0 ? (
                          <>
                            <Patient patient={patient} />
                          </>
                        ) : (
                          <></>
                        )}
                      </Col>
                    ))}
                </>
              ) : (
                <></>
              )} */}
            </Row>
          )}

          {/* <div
            className='mt-4'
            style={{ float: 'left', display: 'inline-block' }}
          >
            <Button variant='primary' size='lg'>
              New patient
            </Button>{' '}
            <Button variant='primary' size='lg'>
              Remove patient
            </Button>
          </div> */}
        </>
      ) : (
        <>
          {' '}
          <p>You have to do the login to see these data</p>
        </>
      )}
    </>
  )
}

export default PatientListByStudy
