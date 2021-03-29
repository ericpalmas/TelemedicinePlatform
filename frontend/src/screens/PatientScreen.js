import React, { useState, useEffect } from 'react'
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import axios from 'axios'

// Patient Table
const columns = [
  {
    dataField: 'dataOra',
    text: 'Data/Ora di prelievo',
  },
  {
    dataField: 'heartRate',
    text: 'Heart Rate',
  },
  {
    dataField: 'temperature',
    text: 'Temperature',
  },
]

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
}

const dati = [
  { dataOra: '18/03/2021 08:45', heartRate: '60-100', temperature: '22' },
  { dataOra: '19/03/2021 09:45', heartRate: '70-90', temperature: '31' },
  { dataOra: '20/03/2021 10:45', heartRate: '80-120', temperature: '33' },
  { dataOra: '21/03/2021 11:45', heartRate: '130-150', temperature: '42' },
  { dataOra: '22/03/2021 12:45', heartRate: '120-140', temperature: '26' },
  { dataOra: '23/03/2021 13:45', heartRate: '70-130', temperature: '33' },
]

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 1500 },
  { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 100, pv: 2400, amt: 2400 },
]

//dentro use effect farò la query per avere il singolo paziente
const PatientScreen = ({ history, match }) => {
  const [patient, setPatient] = useState([])

  useEffect(() => {
    const fetchPatient = async () => {
      const { data } = await axios.get(`/api/patients/${match.params.id}`)

      setPatient(data)
    }
    fetchPatient()
  }, [match])

  return (
    <>
      <Row className="mt-4 mb-4">
        <Col md={6} className="mb-4">
          <h2 className="mt-4 mb-4">Patient Profile</h2>
          <h4>
            {patient.name} {patient.surname}
          </h4>
          <h2 className="mt-4 mb-4">Disease</h2>
          <h4>Imsomnia</h4>
          {patient.pathology}
          <h2 className="mt-4 mb-4">Treatment</h2>
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
    </>
  )
}

export default PatientScreen
