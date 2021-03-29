import React, { useState, useEffect } from 'react'
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import Disease from '../components/Disease'
import axios from 'axios'

const DiseaseListScreen = () => {
  const [diseases, setDiseases] = useState([])

  useEffect(() => {
    const fetchDiseases = async () => {
      const { data } = await axios.get('/api/diseases')

      setDiseases(data)
    }
    fetchDiseases()
  }, [])

  return (
    <>
      <h1>List of diseases</h1>

      <InputGroup className="mb-3 mt-4" style={{ width: '20rem' }}>
        <FormControl
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
      </InputGroup>

      <Row className="mt-4" style={{ float: 'left', display: 'inline-block' }}>
        {diseases.map((disease) => (
          <Col sm={12} md={6} lg={4}>
            <Disease disease={disease} />
          </Col>
        ))}
      </Row>

      <div className="mt-4" style={{ float: 'left', display: 'inline-block' }}>
        <Button variant="primary" size="lg">
          New disease
        </Button>{' '}
        <Button variant="primary" size="lg">
          Remove disease
        </Button>
      </div>
    </>
  )
}

export default DiseaseListScreen
