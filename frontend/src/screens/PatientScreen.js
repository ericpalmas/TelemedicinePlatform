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
import { patientDetails } from '../actions/patientActions'
import { listPatientDiseases } from '../actions/diseaseActions'
import { listSurveyResponses } from '../actions/responsesActions'

import { columns, selectRow, data, dati } from '../sensorTableData.js'
import DownloadCSV from '../components/DownloadCSV'

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

  useEffect(() => {
    dispatch(patientDetails(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    dispatch(listPatientDiseases(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    dispatch(listSurveyResponses(match.params.id))
  }, [dispatch, match])

  const createCSV = () => {
    if (responses) {
      if (responses.lenght !== 0) {
        if (responses[0] !== undefined) {
          responses[0].surveyResponses.forEach((response, index) => {
            // setto gli header
            if (response.question[0]) {
              headers.push({
                label: response.question[0].text,
                key: 'Question ' + (index + 1),
              })
            } else {
              headers.push({
                label: 'Question ' + (index + 1),
                key: 'Question ' + (index + 1),
              })
            }
          })

          // setto i dati
          responses.forEach((response, i) => {
            var cur = {
              surveyName: response.survey[0].name,
              name: patient.name,
              surname: patient.surname,
            }
            response.surveyResponses.forEach((singleResponse, index) => {
              cur['date'] =
                singleResponse.question[0] !== undefined
                  ? singleResponse.question[0].updatedAt.substring(0, 10)
                  : 'date'
              cur['hour'] =
                singleResponse.question[0] !== undefined
                  ? singleResponse.question[0].updatedAt.substring(12, 16)
                  : 'date'

              if (singleResponse.answer.type === 'Check') {
                if (singleResponse.answer.answers !== undefined) {
                  var string = ''
                  singleResponse.answer.answers.forEach(function (element) {
                    string += element.answer + '; '
                  })

                  if (
                    headers.find(
                      (elem) => elem.key === 'Question ' + (index + 1)
                    )
                  )
                    cur['Question ' + (index + 1)] = string
                  //console.log(singleResponse.answer.type + ': ' + string)
                }
              } else {
                // console.log(
                //   singleResponse.answer.type +
                //     ': ' +
                //     singleResponse.answer.answer
                // )
                if (
                  headers.find((elem) => elem.key === 'Question ' + (index + 1))
                )
                  cur['Question ' + (index + 1)] = singleResponse.answer.answer
              }
            })
            data.push(cur)
          })

          console.log(headers)
          console.log(data)

          csvLink.current.link.click()
        }
      }
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
              <p>
                {patient.name} {patient.surname}
              </p>

              <h2 className='mt-4 mb-4'>Diseases</h2>
              {patientDiseases.map((disease) => (
                <p key={disease._id}>{disease.disease.name}</p>
              ))}
              <p>{patient.pathology}</p>
              <Row>
                <Col>
                  <h2 className='mt-4 mb-4'>Treatment</h2>
                </Col>
              </Row>
              <p>{patient.therapy}</p>
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
              {/* <Button onClick={createCSV}>Download transactions to csv</Button>
              <CSVLink
                data={data}
                headers={headers}
                filename='transactions.csv'
                className='hidden'
                ref={csvLink}
                target='_blank'
              /> */}
              <DownloadCSV
                data={data}
                headers={headers}
                responses={responses}
                patient={patient}
              />
              {/* {data.length !== 0 ? (
                <>
                  
             
                </>
              ) : (
                <>
                  <p>Nothing to download</p>
                </>
              )} */}
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
                  {responses.map((response) => (
                    <>
                      {response._id[0] ? (
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
                                    {response.survey.map((surv) => (
                                      <>
                                        {surv ? surv.name : <></>}
                                        {surv ? <> - &nbsp;</> : <></>}
                                        {response._id[0] ? (
                                          response._id[0].updatedAt.substring(
                                            12,
                                            16
                                          )
                                        ) : (
                                          <></>
                                        )}
                                        {surv ? <> - &nbsp;</> : <></>}
                                        {response._id[0] ? (
                                          response._id[0].updatedAt.substring(
                                            0,
                                            10
                                          )
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ))}

                                    <h4></h4>
                                  </Accordion.Toggle>
                                </Card.Header>
                                {response.surveyResponses.map((survey) => (
                                  <>
                                    {survey.question.map((question) => (
                                      <>
                                        <Accordion.Collapse eventKey='1'>
                                          <Card.Body>
                                            <h4>{question.text}</h4>

                                            {question.slider ? (
                                              <p> {survey.answer.answer}</p>
                                            ) : question.trueFalse ? (
                                              <p>
                                                {' '}
                                                {survey.answer.answer
                                                  ? 'true'
                                                  : 'false'}
                                              </p>
                                            ) : question.incrementDecrement ? (
                                              <p> {survey.answer.answer}</p>
                                            ) : question.insertTime ? (
                                              <p> {survey.answer.answer}</p>
                                            ) : question.radio ? (
                                              <p> {survey.answer.answer}</p>
                                            ) : question.check ? (
                                              <>
                                                {survey.answer.answers.map(
                                                  (val, index) => (
                                                    <p>
                                                      {' '}
                                                      {index + 1}) &nbsp;{' '}
                                                      {val.answer}{' '}
                                                    </p>
                                                  )
                                                )}
                                              </>
                                            ) : question.open ? (
                                              <p> {survey.answer.answer}</p>
                                            ) : (
                                              <> </>
                                            )}
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </>
                                    ))}
                                  </>
                                ))}
                              </Card>
                            </Accordion>
                          </Row>
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
