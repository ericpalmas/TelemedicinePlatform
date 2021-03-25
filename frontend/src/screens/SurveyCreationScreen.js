import React, { useState } from 'react'
import { Row, Col, Button, Card, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import AddQuestionModal from '../modals/AddQuestionModal'

// Patient Table
const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
  },
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'surname',
    text: 'Surname',
  },
]

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
}

const patients = [
  { id: 1, name: 'Luca', surname: 'Rossi' },
  { id: 2, name: 'Giacomo', surname: 'Verdi' },
  { id: 3, name: 'Luca', surname: 'Rossi' },
  { id: 4, name: 'Giacomo', surname: 'Verdi' },
  { id: 5, name: 'Luca', surname: 'Rossi' },
  { id: 6, name: 'Giacomo', surname: 'Verdi' },
]

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

const SurveyCreationScreen = () => {
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
          <br />
          <div>
            <h4
              style={{
                float: 'left',
                display: 'inline-block',
                paddingRight: '2rem',
              }}
            >
              Name: Giacomo
            </h4>
            <h4>Surname: Rossi</h4>
          </div>
          {questions.map((question) => (
            <Col key={question._id}>
              <br />
              <Card>
                <Card.Header>Domanda {question._id}</Card.Header>
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
        <AddQuestionModal>bottone</AddQuestionModal>
      </Row>
    </div>
  )
}

export default SurveyCreationScreen
