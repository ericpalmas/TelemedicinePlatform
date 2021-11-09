import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, InputGroup, Alert } from 'react-bootstrap'
import { createStudy, listStudies } from '../actions/studyActions'
import { listSurveyTemplates } from '../actions/surveyActions'

const AddStudyModal = ({ history }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)
  const [items, setItems] = useState([])
  const [defaultSurvey, setDefaultSurvey] = useState({})
  const [errorDuplicates, setErrorDuplicates] = useState(false)
  const [msg, setMsg] = useState('Duplicates are present')

  const studyCreated = useSelector((state) => state.studyCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    study,
  } = studyCreated

  const surveyTemplateList = useSelector((state) => state.surveyTemplateList)
  const { loading, error, surveys } = surveyTemplateList

  function hasDuplicates(array) {
    var valuesSoFar = Object.create(null)
    for (var i = 0; i < array.length; ++i) {
      var value = array[i]
      if (value in valuesSoFar) {
        return true
      }
      valuesSoFar[value] = true
    }
    return false
  }

  // const submitHandler = (e) => {
  //   const form = e.currentTarget
  //   if (form.checkValidity() === false) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }

  //   setValidated(true)

  //   const newStudy = {
  //     name,
  //     description,
  //     surveyIds: items,
  //   }
  //   dispatch(createStudy(newStudy))
  // }

  const submitHandler = (e) => {
    var findError = false

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    if (hasDuplicates(items)) {
      setErrorDuplicates(true)
      findError = true
    } else {
      setErrorDuplicates(false)
    }

    if (findError) {
      e.preventDefault()
    } else {
      const newStudy = {
        name,
        description,
        surveyIds: items,
      }
      dispatch(createStudy(newStudy))
    }
  }

  const handleAddFields = () => {
    const values = [...items]
    values.push(defaultSurvey._id)
    setItems(values)
  }

  const handleRemoveLastFields = () => {
    const values = [...items]
    values.splice(items.length - 1, 1)
    setItems(values)
  }

  const handleInputChange = (index, event) => {
    const values = [...items]
    values[index] = event.target.value
    setItems(values)
  }

  useEffect(() => {
    dispatch(listStudies())
  }, [dispatch, successCreate])

  useEffect(() => {
    dispatch(listSurveyTemplates())
  }, [dispatch])

  useEffect(() => {
    if (surveys) {
      setDefaultSurvey(surveys[0])
    }
  }, [dispatch, surveys])

  return (
    <>
      <Button
        variant='primary'
        size='lg'
        style={{ float: 'right' }}
        onClick={handleShow}
      >
        <i className='fas fa-plus mr-2'></i>
        New study
      </Button>

      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New study</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorDuplicates ? <Alert variant={'danger'}>{msg}</Alert> : <></>}

            <Form.Group controlId='validationCustom02'>
              <Form.Label className='mt-2'>
                <h5>Name</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label className='mt-2'>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              type='description'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label className='mt-2'>
              <h5>Select surveys</h5>
            </Form.Label>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {surveys.length > 0 ? (
                  <>
                    <Button
                      className='ml-2 mr-2'
                      variant='light'
                      id='addRemoveButton'
                      onClick={handleRemoveLastFields}
                      inline='true'
                    >
                      -
                    </Button>

                    <Button
                      className='ml-2 mr-2'
                      variant='light'
                      id='addRemoveButton'
                      onClick={handleAddFields}
                      inline='true'
                    >
                      +
                    </Button>

                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        {items.map((item, index) => (
                          <Form.Control
                            as='select'
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          >
                            {surveys.map((survey) => (
                              <option value={survey._id} key={survey._id}>
                                {survey.name}
                              </option>
                            ))}
                          </Form.Control>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p>there aren't surveys to select</p>
                  </>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>

            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddStudyModal
