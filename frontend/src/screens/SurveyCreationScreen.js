import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Card, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import * as FaIcons from 'react-icons/fa'
import * as TiIcons from 'react-icons/ti'

import Patient from '../components/Patient'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPatientsAndDisease } from '../actions/patientActions'
import { surveyDetails } from '../actions/surveyActions'
import { deleteQuestion } from '../actions/questionActions'

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

// const deleteHandler = (id) => {
//   if (window.confirm('Are you sure')) {
//     console.log(id)
//   }
// }

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
    if (surv !== undefined) {
      setSurveyUploaded(true)
      dispatch(surveyDetails(surv.split('"')[1])).then(() => {
        //console.log(survey)
      })
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
                <h1>{survey.survey.name} Survey</h1>

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
                          <TiIcons.TiDelete size={30} />
                        </Button>
                      </Card.Header>

                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <Card.Title>{q.question.text}</Card.Title>

                          {q.question.check ? (
                            <>
                              {q.answers.map((answer) => (
                                <Form.Check
                                  custom
                                  disabled
                                  label={answer.text}
                                  type="checkbox"
                                />
                              ))}
                            </>
                          ) : q.question.radio ? (
                            <>
                              {q.answers.map((answer) => (
                                <Form.Check
                                  custom
                                  disabled
                                  label={answer.text}
                                  type="radio"
                                />
                              ))}
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
              <h3> Caricare un questionario </h3>
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
