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
//import Disease from '../components/Disease'
import AddStudyModal from '../modals/AddStudyModal'
// import EditDiseaseModal from '../modals/EditDiseaseModal'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStudies, deleteStudy, createStudy } from '../actions/studyActions'

const StudyListScreen = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const studyList = useSelector((state) => state.studyList)
  const {
    loading: loadingStudyList,
    error: errorStudyList,
    studies,
  } = studyList

  const studyDelete = useSelector((state) => state.studyDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studyDelete

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    let isMounted = true
    dispatch(listStudies())
    return () => {
      isMounted = false
    }
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStudy(id))
    }
  }

  return (
    <>
      <h1>List of studies</h1>
      <Row className='align-items-center'>
        <Col className='text-right' sm={6} md={4}>
          <InputGroup className='mb-3 mt-4' style={{ width: '20rem' }}>
            <FormControl
              placeholder='Search'
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col sm={6}>
          <AddStudyModal />
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingStudyList ? (
        <Loader />
      ) : errorStudyList ? (
        <Message variant='danger'>{errorStudyList}</Message>
      ) : (
        <>
          <Row
            className='mt-4'
            style={{ float: 'left', display: 'inline-block' }}
          >
            {studies
              .filter(
                (study) =>
                  study.name !== null &&
                  study.name.toLowerCase().includes(search.toLowerCase())
              )

              .map((study) => (
                <Col key={study._id} sm={12}>
                  <Card
                    className='my-3 p-3 rounded'
                    style={{ width: '60rem', height: '5rem' }}
                  >
                    <a>
                      <a href={`/patients/patientsByStudy/${study._id}`}>
                        <Card.Title
                          as='div'
                          className='mr-1'
                          style={{ float: 'left' }}
                        >
                          <strong>{study.name}</strong>
                        </Card.Title>
                      </a>

                      <Button
                        variant='danger'
                        style={{ float: 'right' }}
                        onClick={() => deleteHandler(study._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                      {/* <EditDiseaseModal disease={disease} /> */}
                    </a>
                  </Card>
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}

export default StudyListScreen
