import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import Disease from '../components/Disease'
import AddDiseaseModal from '../modals/AddDiseaseModal'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDiseases } from '../actions/diseaseActions'
import { DISEASE_CREATE_RESET } from '../constants/diseaseConstants'

const DiseaseListScreen = () => {
  const dispatch = useDispatch()

  const diseaseList = useSelector((state) => state.diseaseList)
  const { loading, error, diseases } = diseaseList

  useEffect(() => {
    dispatch({ type: DISEASE_CREATE_RESET })
    dispatch(listDiseases())
  }, [dispatch])

  return (
    <>
      <h1>List of diseases</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <InputGroup className="mb-3 mt-4" style={{ width: '20rem' }}>
            <FormControl
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          <Row
            className="mt-4"
            style={{ float: 'left', display: 'inline-block' }}
          >
            {diseases.map((disease) => (
              <Col sm={12} md={6} lg={4}>
                <Disease disease={disease} />
              </Col>
            ))}
          </Row>

          <div
            className="mt-4"
            style={{ float: 'left', display: 'inline-block' }}
          >
            <AddDiseaseModal />

            <Button variant="primary" size="lg">
              Remove disease
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default DiseaseListScreen
