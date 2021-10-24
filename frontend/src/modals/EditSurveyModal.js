import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'

import { updateNameSurvey, surveyDetails } from '../actions/surveyActions'

const EditSurveyModal = ({ surveyName, surveyId }) => {
  // const [name, setName] = useState(surveyName)
  const [name, setName] = useState('')

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

  const currentSurvey = useSelector((state) => state.currentSurvey)
  const {
    loading: loadingCurrentSurvey,
    error: errorCurrentSurvey,
    survey: currentId,
  } = currentSurvey

  var surveyDetail = useSelector((state) => state.survey)
  var { loading: loadingSurvey, error: errorSurvey, survey } = surveyDetail

  var surv = localStorage.getItem('surveyId') || 'noIdSaved'

  const submitHandler = (e) => {
    e.preventDefault()
    const newName = {
      id: surveyId,
      name: name,
    }

    dispatch(updateNameSurvey(newName))
  }

  const updateCUrrentSurvey = useCallback(() => {
    if (!loadingSurvey && currentId) {
      dispatch(surveyDetails(currentId))
    }
  }, [currentId])

  useEffect(() => {
    if (surv !== 'noIdSaved') {
      if (surv !== undefined) {
        dispatch(surveyDetails(surv.split('"')[1]))
      }
    }
    updateCUrrentSurvey()
  }, [dispatch, surv, successUpdateName, updateCUrrentSurvey])

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
