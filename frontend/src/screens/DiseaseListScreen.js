import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Card,
} from 'react-bootstrap'
import Disease from '../components/Disease'
import AddDiseaseModal from '../modals/AddDiseaseModal'
import EditDiseaseModal from '../modals/EditDiseaseModal'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDiseases, deleteDisease } from '../actions/diseaseActions'

const DiseaseListScreen = () => {
  const dispatch = useDispatch()

  const diseaseList = useSelector((state) => state.diseaseList)
  const { loading, error, diseases } = diseaseList

  const diseaseDelete = useSelector((state) => state.diseaseDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = diseaseDelete

  useEffect(() => {
    dispatch(listDiseases())
  }, [dispatch])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDisease(id)).then(() => {
        dispatch(listDiseases())
      })
    }
  }

  const editHandler = (id) => {}

  return (
    <h1>
      <h1>List of diseases</h1>
      <Row className="align-items-center">
        <Col className="text-right" sm={6} md={4}>
          <InputGroup className="mb-3 mt-4" style={{ width: '20rem' }}>
            <FormControl
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
        </Col>
        <Col sm={6}>
          <AddDiseaseModal />
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row
            className="mt-4"
            style={{ float: 'left', display: 'inline-block' }}
          >
            {diseases.map((disease) => (
              <Col key={disease._id} sm={12}>
                <Card
                  className="my-3 p-3 rounded"
                  style={{ width: '60rem', height: '5rem' }}
                >
                  <a>
                    <a href={`/patients/patientsByDisease/${disease._id}`}>
                      <Card.Title
                        as="div"
                        className="mr-1"
                        style={{ float: 'left' }}
                      >
                        <strong>{disease.name}</strong>
                      </Card.Title>
                    </a>

                    <Button
                      variant="danger"
                      style={{ float: 'right' }}
                      onClick={() => deleteHandler(disease._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    <EditDiseaseModal disease={disease} />
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </h1>
  )
}

export default DiseaseListScreen
