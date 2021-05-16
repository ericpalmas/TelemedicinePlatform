import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { createSurvey, listSurveyTemplates } from '../actions/surveyActions'

const AddSurveyModal = () => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const surveyCreated = useSelector((state) => state.surveyCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    survey: surveyCreate,
  } = surveyCreated

  const submitHandler = (e) => {
    e.preventDefault()
    const newSurvey = {
      name,
      description,
    }
    dispatch(createSurvey(newSurvey)).then(() => {
      dispatch(listSurveyTemplates())
    })
  }

  useEffect(() => {
    if (successCreate) {
      dispatch(listSurveyTemplates())
      setName('')
      setDescription('')
    }
  }, [dispatch, successCreate])

  return (
    <>
      <FormLabel variant="primary" onClick={handleShow} className="ml-3">
        New Survey
      </FormLabel>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-2">
            <h5>Survey name</h5>
          </Form.Label>
          <Form.Control
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label className="mt-2">
            <h5>Description</h5>
          </Form.Label>
          <Form.Control
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Form onSubmit={submitHandler}>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddSurveyModal
