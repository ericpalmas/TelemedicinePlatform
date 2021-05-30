import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Card, Form, Figure } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import * as FaIcons from 'react-icons/fa'
import * as TiIcons from 'react-icons/ti'
import * as MdIcons from 'react-icons/md'

import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import EditQuestionModal from '../modals/EditQuestionModal'

import { listPatientsAndDisease } from '../actions/patientActions'
import { surveyDetails } from '../actions/surveyActions'
import { deleteQuestion } from '../actions/questionActions'

import icons from '../icons.js'

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

  const surveyDetail = useSelector((state) => state.survey)
  const { loading: loadingSurvey, error: errorSurvey, survey } = surveyDetail

  const [surveyUploaded, setSurveyUploaded] = useState(false)

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteQuestion(id)).then(() => {
        dispatch(surveyDetails(surv.split('"')[1]))
      })
    }
  }

  useEffect(() => {
    // togliere il booleano survey uploaded altrimenti non posso cambiare il questionario senza ricaricare
    // la pagina
    console.log(survey)
    if (surv !== undefined) {
      dispatch(surveyDetails(surv.split('"')[1]))
        .then(() => {
          setSurveyUploaded(true)
        })
        .catch(() => {
          setSurveyUploaded(false)
        })
    } else {
    }

    dispatch(listPatientsAndDisease())
  }, [dispatch, match, history, surv])

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
                  <h1>{survey.survey.name} Survey</h1>
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
                                {/* Variable width content */}
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
          <BootstrapTable
            keyField="id"
            data={patients}
            columns={columns}
            selectRow={selectRow}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SurveyCreationScreen
