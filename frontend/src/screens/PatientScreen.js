import React, { useEffect } from 'react'
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
import BootstrapTable from 'react-bootstrap-table-next'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { patientDetails } from '../actions/patientActions'
import { listPatientDiseases } from '../actions/diseaseActions'

import { columns, selectRow, data, dati } from '../sensorTableData.js'

//dentro use effect farò la query per avere il singolo paziente
const PatientScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const patientDetail = useSelector((state) => state.patientDetail)
  const { loading, error, patient } = patientDetail

  const patientDiseasesList = useSelector((state) => state.patientDiseasesList)
  const {
    loadingPatientDiseases,
    errorPatientDiseases,
    patientDiseases,
  } = patientDiseasesList

  useEffect(() => {
    dispatch(patientDetails(match.params.id))
    dispatch(listPatientDiseases(match.params.id))
  }, [dispatch, match])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="mt-4 mb-4">
            <Col md={6} className="mb-4">
              <h2 className="mt-4 mb-4">Patient Profile</h2>
              <h4>
                {patient.name} {patient.surname}
              </h4>
              <h2 className="mt-4 mb-4">Diseases</h2>

              {patientDiseases.map((disease) => (
                <p key={disease._id}>{disease.disease.name}</p>
              ))}
              {patient.pathology}

              <Row>
                <Col>
                  <h2 className="mt-4 mb-4">Treatment</h2>
                </Col>
                <Col>
                  <Button
                    variant="light"
                    style={{ float: 'left', verticalAlign: 'middle' }}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                </Col>
              </Row>
              {patient.therapy}
            </Col>
          </Row>

          <Row className="mt-4 mb-4">
            <Col md={6} className="mt-4 mb-4">
              <h2>Patient Data</h2>
              <BootstrapTable
                keyField="id"
                data={dati}
                columns={columns}
                selectRow={selectRow}
              />
            </Col>
            <Col md={6} className="mt-4 mb-4">
              <h2>Grafico</h2>
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
          </Row>

          {/* risposte ai questionari  */}
          <Row className="mt-4 mb-4">
            <h2>Patient survey responses</h2>
            <br></br>
          </Row>

          <Row>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Parkinson Survey - data
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>1. Come ti chiami?</h4>
                    Luca
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>2. Quanti anni hai?</h4>
                    25
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>3. Quante volte hai dormito?</h4>4
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Row>

          <Row>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Parkinson Survey - data
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>1. Come ti chiami?</h4>
                    Luca
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>2. Quanti anni hai?</h4>
                    25
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>3. Quante volte hai dormito?</h4>4
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Row>

          <Row>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Parkinson Survey - data
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>1. Come ti chiami?</h4>
                    Luca
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>2. Quanti anni hai?</h4>
                    25
                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h4>3. Quante volte hai dormito?</h4>4
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Row>
        </>
      )}
    </>
  )
}

export default PatientScreen
