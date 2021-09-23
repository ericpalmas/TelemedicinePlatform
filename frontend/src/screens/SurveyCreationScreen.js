import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Figure,
  Table,
  InputGroup,
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import * as FaIcons from 'react-icons/fa'
import * as TiIcons from 'react-icons/ti'
import * as MdIcons from 'react-icons/md'

import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import EditQuestionModal from '../modals/EditQuestionModal'

import { listPatientsAndDisease } from '../actions/patientActions'
import {
  surveyDetails,
  assignSurveys,
  listSurveyAssignedWithPatients,
} from '../actions/surveyActions'
import { deleteQuestion } from '../actions/questionActions'

import icons from '../icons.js'
import { surveyAssignedWithPatientReducer } from '../reducers/surveyReducers'
import { set } from 'mongoose'

// Patient Table
const columns = [
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'surname',
    text: 'Surname',
  },
  {
    dataField: 'disease',
    text: 'diseases',
  },
]

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
}

const SurveyCreationScreen = ({ removeQuestionMode, history, match }) => {
  const dispatch = useDispatch()

  var surv = localStorage.getItem('surveyId')

  const patientList = useSelector((state) => state.patientsAndDiseaseList)
  const { loading, error, patients } = patientList

  // const surveyAssignedWithPatient = useSelector(
  //   (state) => state.surveyAssignedWithPatient,
  // )
  // const {
  //   loading: loadingAssignements,
  //   error: errorAssignements,
  //   patientsAssignements,
  // } = surveyAssignedWithPatient

  var surveyDetail = useSelector((state) => state.survey)
  var { loading: loadingSurvey, error: errorSurvey, survey } = surveyDetail

  const currentSurvey = useSelector((state) => state.currentSurvey)
  const {
    loading: loadingCurrentSurvey,
    error: errorCurrentSurvey,
    survey: currentId,
  } = currentSurvey

  const assignSurveysToPatient = useSelector(
    (state) => state.surveyPatientAssignment,
  )
  const {
    loading: loadingAssignemtsToPatient,
    error: errorAssignemtsToPatient,
    assignments: assignmentsToPatients,
    success,
  } = assignSurveysToPatient

  const [surveyUploaded, setSurveyUploaded] = useState(false)
  const [assignementUploaded, setAssignementSurveyUploaded] = useState(false)

  const [items, setItems] = useState([])
  const [hour, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const userLogin = useSelector((state) => state.doctorLogin)
  const { loading: loginLoading, error: loginError, userInfo } = userLogin

  // const [assignments, setAssignments] = React.useState(
  //   Array(patients.length).fill(false),
  // )

  // (Array.from([1, 2, 3], x => x + x))

  //const [assignments, setAssignments] = useState([])

  const handleSelectAssignments = (e, index) => {
    var values = [...assignments]
    values[index] = e.target.checked
    setAssignments(values)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteQuestion(id)).then(() => {
        dispatch(surveyDetails(surv.split('"')[1]))
      })
    }
  }

  const submitSurvey = () => {
    var selectedPatients = []
    for (var i = 0; i < assignments.length; i++) {
      if (assignments[i])
        selectedPatients.push({
          name: patients[i].name,
          patientId: patients[i]._id,
          doctorId: userInfo._id,
          surveyId: surv.split('"')[1],
        })
    }
    if (
      window.confirm(
        `Are you sure to send surveys to ${selectedPatients.map(
          (e) => ' ' + e.name,
        )}`,
      )
    ) {
      dispatch(assignSurveys(selectedPatients))
    }
  }

  const updateCUrrentSurvey = useCallback(() => {
    if (!loadingSurvey && currentId) {
      dispatch(surveyDetails(currentId))
        .then(() => {
          setSurveyUploaded(true)
        })
        .catch(() => {
          setSurveyUploaded(false)
        })
    }
  }, [currentId])

  useEffect(() => {
    updateCUrrentSurvey()
    if (surv !== undefined) {
      dispatch(surveyDetails(surv.split('"')[1]))
        .then(() => {
          setSurveyUploaded(true)
        })
        .catch(() => {
          setSurveyUploaded(false)
        })
    }
  }, [dispatch, match, history, updateCUrrentSurvey, surv])

  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    if (surv !== undefined) dispatch(listPatientsAndDisease(surv.split('"')[1]))
  }, [dispatch, surv])

  useEffect(() => {
    var values = [...assignments]
    values = Array.from(patients, (x) => x.assigned)
    setAssignments(values)
  }, [patients])

  return (
    <div>
      <Row
        style={{
          marginTop: '2rem',
          width: '90rem',
        }}
      >
        {surveyUploaded ? (
          <>
            {loadingSurvey ? (
              <Loader />
            ) : errorSurvey ? (
              <Message variant="danger">{errorSurvey}</Message>
            ) : (
              <Col
                md={9}
                style={{
                  borderRight: 'solid 1px grey',
                  borderLeft: 'solid 1px grey',
                }}
              >
                {survey.survey !== null ? (
                  <h1 className="pl-3">{survey.survey.name} Survey</h1>
                ) : (
                  <h2>Caricare un documento o crearne uno nuovo</h2>
                )}

                {survey.questions.map((q, index) => (
                  <Col key={q.question._id}>
                    <br />
                    <Card>
                      <Card.Header>
                        Domanda {index + 1}
                        <Button
                          style={{
                            float: 'right',
                            display: 'inline-block',
                          }}
                          // variant="danger"
                          variant="light"
                          className="btn-sm"
                          onClick={() => deleteHandler(q.question._id)}
                        >
                          <MdIcons.MdDelete size={30} />
                        </Button>
                        <EditQuestionModal question={q} />
                      </Card.Header>

                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <Card.Title>{q.question.text}</Card.Title>

                          {q.question.check ? (
                            <>
                              {q.answers.map((answer) => (
                                <>
                                  <Form.Check
                                    key={answer._id}
                                    custom
                                    disabled
                                    inline
                                    label={answer.text}
                                    type="checkbox"
                                  />

                                  {answer.image === undefined ||
                                  answer.image === -1 ? (
                                    <></>
                                  ) : (
                                    <Figure className="m-0">
                                      <Figure.Image
                                        width={30}
                                        height={30}
                                        src={icons[answer.image].path}
                                        value={answer.image}
                                      />
                                    </Figure>
                                  )}

                                  <br></br>
                                </>
                              ))}
                            </>
                          ) : q.question.radio ? (
                            <>
                              {q.answers.map((answer) => (
                                <>
                                  <Form.Check
                                    key={answer._id}
                                    custom
                                    disabled
                                    inline
                                    label={answer.text}
                                    type="radio"
                                  />

                                  {answer.image === null ||
                                  answer.image === -1 ? (
                                    <></>
                                  ) : (
                                    <Figure className="m-0">
                                      <Figure.Image
                                        width={30}
                                        height={30}
                                        src={icons[answer.image].path}
                                        value={answer.image}
                                      />
                                    </Figure>
                                  )}

                                  <br></br>
                                </>
                              ))}
                            </>
                          ) : q.question.slider ? (
                            <>
                              <Row className="justify-content-md-center">
                                {q.answers[0].image === undefined ||
                                q.answers[0].image === -1 ? (
                                  <></>
                                ) : (
                                  <Figure className="m-0">
                                    <Figure.Image
                                      width={30}
                                      height={30}
                                      src={icons[q.answers[0].image].path}
                                      value={q.answers[0].image}
                                    />
                                  </Figure>
                                )}

                                <Col xs md="auto">
                                  {q.answers[0].text}
                                </Col>

                                <Col xs>
                                  <Form>
                                    <Form.Group controlId="formBasicRangeCustom">
                                      <Form.Control type="range" custom />
                                    </Form.Group>
                                  </Form>
                                </Col>

                                <Col xs md="auto">
                                  {q.answers[1].text}
                                </Col>

                                {q.answers[1].image === undefined ||
                                q.answers[1].image === -1 ? (
                                  <></>
                                ) : (
                                  <Figure className="m-0">
                                    <Figure.Image
                                      width={30}
                                      height={30}
                                      src={icons[q.answers[1].image].path}
                                      value={q.answers[1].image}
                                    />
                                  </Figure>
                                )}
                              </Row>
                            </>
                          ) : q.question.trueFalse ? (
                            <>
                              <Button className="m-1">Si</Button>
                              <Button
                                inline
                                className="m-1"
                                style={{
                                  backgroundColor: '#f7a723',
                                }}
                              >
                                No
                              </Button>
                            </>
                          ) : q.question.incrementDecrement ? (
                            <>
                              {q.answers[0].image === undefined ||
                              q.answers[0].image === -1 ? (
                                <></>
                              ) : (
                                <Figure className="m-0">
                                  <Figure.Image
                                    width={30}
                                    height={30}
                                    src={icons[q.answers[0].image].path}
                                    value={q.answers[0].image}
                                  />
                                </Figure>
                              )}
                              <h1>00</h1>
                              <Button className="m-1">-</Button>
                              <Button
                                inline
                                className="m-1"
                                style={{
                                  backgroundColor: '#f7a723',
                                }}
                              >
                                +
                              </Button>
                            </>
                          ) : q.question.insertTime ? (
                            <>
                              <Row className="justify-content-md-center">
                                {/* Variable width content */}
                                <Col xs md="auto">
                                  00 :
                                </Col>
                                <Col xs md="auto">
                                  00
                                </Col>
                              </Row>
                              <Row className="justify-content-md-center">
                                <Col xs md="auto">
                                  <Button>-</Button>
                                </Col>
                                <Col xs md="auto">
                                  <Button
                                    style={{
                                      backgroundColor: '#f7a723',
                                    }}
                                  >
                                    +
                                  </Button>
                                </Col>
                                <Col xs md="auto">
                                  <Button>-</Button>
                                </Col>
                                <Col xs md="auto">
                                  <Button
                                    style={{
                                      backgroundColor: '#f7a723',
                                    }}
                                  >
                                    +
                                  </Button>
                                </Col>
                              </Row>
                            </>
                          ) : (
                            <Form.Group>
                              <Form.Control
                                placeholder="Open question"
                                disabled
                              />
                            </Form.Group>
                          )}
                        </blockquote>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Col>
            )}
          </>
        ) : (
          <>
            <Col md={9}>
              <h3> Nessun questionario caricato </h3>
            </Col>
          </>
        )}
        <Col md={3}>
          <br />
          <h4> Patient list </h4>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Diseases</th>
              </tr>
            </thead>
            {/* fare in modo che vengano checkati i pazienti  */}
            <tbody>
              {patients.map((patient, index) => (
                <tr>
                  <td>
                    <Form.Group controlId="isadmin">
                      <Form.Check
                        type="checkbox"
                        // da sistemare
                        // checked={isAdmin}
                        // onChange={(e) => setIsAdmin(e.target.checked)}

                        checked={assignments[index]}
                        onChange={(e) => handleSelectAssignments(e, index)}

                        //checked={patient.assigned}
                      ></Form.Check>
                    </Form.Group>
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.surname}</td>
                  <td>{patient.disease}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <br />
          <br />

          <Button onClick={submitSurvey}>Save</Button>
        </Col>
      </Row>
    </div>
  )
}

export default SurveyCreationScreen
