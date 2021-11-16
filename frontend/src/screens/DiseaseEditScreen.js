import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainter'
//import { getDoctorDetails, updateDoctor } from '../actions/doctorActions'
import { updateDisease, diseaseDetails } from '../actions/diseaseActions'
import { DISEASE_UPDATE_RESET } from '../constants/diseaseConstants'

const DiseaseEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [diseaseUploaded, setDiseaseUploaded] = useState(false)

  const dispatch = useDispatch()

  const diseaseDetail = useSelector((state) => state.diseaseDetail)
  const { loading, error, disease } = diseaseDetail

  const diseaseUpdate = useSelector((state) => state.diseaseUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = diseaseUpdate

  //   useEffect(() => {
  //     if (successUpdate) {
  //       dispatch({ type: DOCTOR_UPDATE_RESET })
  //       history.push('/admin/diseaselist')
  //     } else {
  //       if (userId !== undefined) dispatch(diseaseDetails(userId))
  //     }
  //   }, [dispatch, history, userId, user, successUpdate])

  const setDiseaseData = useCallback(() => {
    if (diseaseUploaded) {
      setName(disease.name)
      setDescription(disease.description)
    }
  }, [diseaseUploaded])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DISEASE_UPDATE_RESET })
      history.push('/admin/diseaselist')
    } else {
      if (userId != undefined) {
        dispatch(diseaseDetails(userId)).then(() => {
          setDiseaseUploaded(true)
        })
        setDiseaseData()
      }
    }
  }, [dispatch, history, userId, successUpdate, setDiseaseData])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateDisease({ _id: userId, name, description }))
  }

  return (
    <>
      <Link to='/admin/diseaselist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default DiseaseEditScreen
