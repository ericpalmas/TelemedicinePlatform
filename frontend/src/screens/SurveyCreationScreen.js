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

// const patients = [
//   { _id: 1, name: 'Luca', surname: 'Rossi' },
//   { _id: 2, name: 'Giacomo', surname: 'Verdi' },
//   { _id: 3, name: 'Luca', surname: 'Rossi' },
//   { _id: 4, name: 'Giacomo', surname: 'Verdi' },
//   { _id: 5, name: 'Luca', surname: 'Rossi' },
//   { _id: 6, name: 'Giacomo', surname: 'Verdi' },
// ]

// Questions
const questions = [
  {
    _id: 1,
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    type: 'checkbox',
  },
  {
    _id: 2,
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante ?',
    type: 'open',
  },
  { _id: 3, question: 'Ultima domanda?', type: 'radio' },
]

const deleteHandler = (id) => {
  if (window.confirm('Are you sure')) {
    console.log(id)
  }
}

const SurveyCreationScreen = ({ removeQuestionMode }) => {
  const dispatch = useDispatch()

  const patientList = useSelector((state) => state.patientAndDiseaseList)
  const { loading, error, patients } = patientList

  useEffect(() => {
    dispatch(listPatientsAndDisease())
    console.log(patients)
  }, [dispatch])

  return (
    <div>
      <Row
        style={{
          marginTop: '2rem',
          width: '90rem',
        }}
      >
        <Col
          md={9}
          style={{
            borderRight: 'solid 1px grey',
            borderLeft: 'solid 1px grey',
          }}
        >
          {questions.map((question) => (
            <Col key={question._id}>
              <br />
              <Card>
                <Card.Header>
                  Domanda {question._id}
                  <Button
                    style={{
                      float: 'right',
                      display: 'inline-block',
                    }}
                    // variant="danger"
                    variant="light"
                    className="btn-sm"
                    onClick={() => deleteHandler(question._id)}
                  >
                    <TiIcons.TiDelete size={30} />
                  </Button>
                </Card.Header>

                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <Card.Title>{question.question}</Card.Title>

                    {question.type === 'checkbox' ? (
                      <>
                        <Form.Check
                          custom
                          disabled
                          label="Answer 1"
                          type="checkbox"
                        />
                        <Form.Check
                          custom
                          disabled
                          label="Answer 2"
                          type="checkbox"
                        />
                        <Form.Check
                          custom
                          disabled
                          label="Answer 3"
                          type="checkbox"
                        />
                      </>
                    ) : question.type === 'radio' ? (
                      <>
                        <Form.Check
                          custom
                          disabled
                          label="Answer 1"
                          type="radio"
                        />
                        <Form.Check
                          custom
                          disabled
                          label="Answer 2"
                          type="radio"
                        />
                        <Form.Check
                          custom
                          disabled
                          label="Answer 3"
                          type="radio"
                        />
                      </>
                    ) : (
                      <Form.Group>
                        <Form.Control placeholder="Open question" disabled />
                      </Form.Group>
                    )}
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <br />
        </Col>

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
