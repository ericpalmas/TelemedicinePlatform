import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'

import { updateNameSurvey } from '../actions/surveyActions'

const EditSurveyModal = ({ surveyName, surveyId }) => {
  const [name, setName] = useState(surveyName)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const surveyUpdateName = useSelector((state) => state.surveyUpdateName)
  const {
    loading: loadingSurveyUpdateName,
    error: errorSurveyUpdateName,
    success: successUpdateName,
  } = surveyUpdateName

  const submitHandler = (e) => {
    e.preventDefault()
    const newName = {
      id: surveyId,
      name: name,
    }

    dispatch(updateNameSurvey(newName))
  }

  useEffect(() => {}, [dispatch])

  return (
    <>
      <Button variant='light' style={{ float: 'right' }} onClick={handleShow}>
        <i className='fas fa-edit'></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label className='mt-2'>
              <h5>Name</h5>
            </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>

            <Button variant='primary' type='submit' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditSurveyModal
