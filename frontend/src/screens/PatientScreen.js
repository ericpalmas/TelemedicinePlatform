import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Accordion,
  Card,
} from 'react-bootstrap'
import { CSVLink, CSVDownload } from 'react-csv'
import BootstrapTable from 'react-bootstrap-table-next'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  patientDetails,
  deletePatientDevice,
  patientDevice,
} from '../actions/patientActions'
import { listPatientDiseases } from '../actions/diseaseActions'
import { listSurveyResponses } from '../actions/responsesActions'

import { columns, selectRow, data, dati } from '../sensorTableData.js'
import DownloadCSV from '../components/DownloadCSV'

import DownloadMultiplePatientCSV from '../components/DownloadMultiplePatientCSV'
import EditPatientDeviceModal from '../modals/EditPatientDeviceModal'

//dentro use effect farò la query per avere il singolo paziente
const PatientScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const [updated, setUpdated] = useState(false)

  const csvLink = React.createRef()

  var headers = [
    { label: 'Survey Name', key: 'surveyName' },
    { label: 'Date', key: 'date' },
    { label: 'Hour', key: 'hour' },
    { label: 'Name', key: 'name' },
    { label: 'Surname', key: 'surname' },
  ]

  var data = []

  const patientDetail = useSelector((state) => state.patientDetail)
  const { loading, error, patient } = patientDetail

  const patientDiseasesList = useSelector((state) => state.patientDiseasesList)
  const { loadingPatientDiseases, errorPatientDiseases, patientDiseases } =
    patientDiseasesList

  const responsesList = useSelector((state) => state.responsesList)
  const {
    loading: loadingResponses,
    error: errorResponses,
    responses,
  } = responsesList

  const deviceDetail = useSelector((state) => state.patientDevice)
  const { loading: loadingDevices, error: errorDevices, device } = deviceDetail

  const createdDevice = useSelector((state) => state.patientDeviceCreate)
  const {
    loading: loadingCreateDevice,
    error: errorCreateDevice,
    success: successCreateDevice,
  } = createdDevice

  const deletedDevice = useSelector((state) => state.patientDeviceDelete)
  const {
    loading: loadingDeleteDevice,
    error: errorDeleteDevice,
    success: successDeleteDevice,
  } = deletedDevice

  useEffect(() => {
    dispatch(patientDetails(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    dispatch(listPatientDiseases(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    dispatch(listSurveyResponses(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    dispatch(patientDevice(match.params.id))
  }, [dispatch, match, successCreateDevice, successDeleteDevice])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatientDevice(id))
    }
  }

  return (
    <>
      {loading && loadingPatientDiseases ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='mt-4 mb-4'>
            <Col md={6} className='mb-4'>
              <h2 className='mt-4 mb-4'>Patient Profile</h2>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: 'sans-serif-light',
                }}
              >
                {patient.name} {patient.surname}
              </p>

              <h2 className='mt-4 mb-4'>Diseases</h2>
              {patientDiseases.map((disease) => (
                <p key={disease._id}>{disease.disease.name}</p>
              ))}
              <p
                style={{
                  fontSize: 20,
                  fontFamily: 'sans-serif-light',
                }}
              >
                {patient.pathology}
              </p>

              <Row>
                <Col>
                  <h2 className='mt-4 mb-4'>Treatment</h2>
                </Col>
              </Row>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: 'sans-serif-light',
                }}
              >
                {patient.therapy}
              </p>

              <Row>
                <Col>
                  <h2 className='mt-4 mb-4'>Patient device</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  {loadingDevices ? (
                    <Loader />
                  ) : errorDevices ? (
                    <Row>
                      <p>Nessun dispositivo associato</p>
                      <Col>
                        <EditPatientDeviceModal
                          data-testid='editButton'
                          patientId={patient._id}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row className='ml-1'>
                      <Col sm={20}>
                        <p
                          style={{
                            fontSize: 20,
                            fontFamily: 'sans-serif-light',
                          }}
                        >
                          {' '}
                          Device code: {device.macAdress}
                        </p>
                      </Col>

                      <Col>
                        <Button
                          data-testid='deleteButton'
                          variant='danger'
                          style={{ float: 'right' }}
                          onClick={() => deleteHandler(patient._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>

                        <EditPatientDeviceModal
                          data-testid='editButton'
                          patientId={patient._id}
                          device={device}
                        />
                      </Col>
                      <Col></Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          {/* abilitare questa parte quando i sensori andranno */}
          {/* 
          <Row className="mt-4 mb-4">
            <Col md={6} className="mt-4 mb-4">
              <h2 className="mb-4">Patient Data</h2>
              <BootstrapTable
                keyField="id"
                data={dati}
                columns={columns}
                selectRow={selectRow}
              />
            </Col>
            <Col md={6} className="mt-4 mb-4">
              <h2 className="mb-4">Grafico</h2>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Col>
          </Row> */}

          {/* risposte ai questionari  */}
          <Row className='mt-4 mb-4'>
            <Col>
              <h2>Patient survey responses</h2>
            </Col>

            <Col>
              <DownloadMultiplePatientCSV
                data={data}
                headers={headers}
                responses={responses}
                patient={patient}
              />
            </Col>

            <br></br>
          </Row>

          {loadingResponses ? (
            <Loader />
          ) : errorResponses ? (
            <Message variant='danger'>{errorResponses}</Message>
          ) : (
            <>
              {responses ? (
                <>
                  {responses.map((survey) => (
                    <>
                      {survey ? (
                        <>
                          {survey.survey.map((surveyResponse) => (
                            <>
                              <Row>
                                <Accordion
                                  defaultActiveKey='0'
                                  style={{
                                    overflow: 'hidden',
                                    position: 'relative',
                                    width: '60%',
                                  }}
                                >
                                  <Card>
                                    <Card.Header>
                                      <Accordion.Toggle
                                        as={Button}
                                        variant='link'
                                        eventKey='1'
                                      >
                                        {surveyResponse.survey.name}
                                        &nbsp;{' '}
                                        {surveyResponse.surveyResponses[0].surveyResponse.updatedAt.substring(
                                          8,
                                          10
                                        )}
                                        {'-'}
                                        {surveyResponse.surveyResponses[0].surveyResponse.updatedAt.substring(
                                          5,
                                          7
                                        )}
                                        {'-'}
                                        {surveyResponse.surveyResponses[0].surveyResponse.updatedAt.substring(
                                          0,
                                          4
                                        )}
                                        &nbsp;{' '}
                                        {surveyResponse.surveyResponses[0].surveyResponse.updatedAt.substring(
                                          11,
                                          16
                                        )}{' '}
                                      </Accordion.Toggle>
                                    </Card.Header>

                                    {surveyResponse.surveyResponses.map(
                                      (response) => (
                                        <>
                                          <Accordion.Collapse eventKey='1'>
                                            <Card.Body>
                                              {response.question !==
                                              undefined ? (
                                                <>
                                                  <h4>
                                                    {response.question.text}
                                                  </h4>

                                                  {response.question.slider ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer}
                                                    </p>
                                                  ) : response.question
                                                      .trueFalse ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer
                                                        ? 'true'
                                                        : 'false'}
                                                    </p>
                                                  ) : response.question
                                                      .incrementDecrement ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer}
                                                    </p>
                                                  ) : response.question
                                                      .insertTime ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer}
                                                    </p>
                                                  ) : response.question
                                                      .radio ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer}
                                                    </p>
                                                  ) : response.question
                                                      .check ? (
                                                    <>
                                                      {response.answer.answers.map(
                                                        (val, index) => (
                                                          <p>
                                                            {' '}
                                                            {index + 1}) &nbsp;{' '}
                                                            {val.answer}{' '}
                                                          </p>
                                                        )
                                                      )}
                                                    </>
                                                  ) : response.question.open ? (
                                                    <p>
                                                      {' '}
                                                      {response.answer.answer}
                                                    </p>
                                                  ) : (
                                                    <> </>
                                                  )}
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </>
                                      )
                                    )}
                                  </Card>
                                </Accordion>
                              </Row>
                            </>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default PatientScreen
