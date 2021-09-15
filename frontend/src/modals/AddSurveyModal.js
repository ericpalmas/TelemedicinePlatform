import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, InputGroup } from 'react-bootstrap'
import { createSurvey, listSurveyTemplates } from '../actions/surveyActions'

const AddSurveyModal = () => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [validated, setValidated] = useState(false)

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
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

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
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New survey</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="nameValidation">
              <Form.Label className="mt-2">
                <h5>Survey name</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddSurveyModal
