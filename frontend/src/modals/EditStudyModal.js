import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, Alert, InputGroup } from 'react-bootstrap'
//import { updateDisease, listDiseases } from '../actions/diseaseActions'
import { listSurveyTemplates } from '../actions/surveyActions'
import { updateStudy } from '../actions/studyActions'

const EditDiseaseModal = ({ history, study, currentSurveys }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(study.name)
  const [description, setDescription] = useState(study.description)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [items, setItems] = useState(currentSurveys.map((c) => c._id))
  const [surveysSelected, setSurveysSelected] = useState(
    currentSurveys.map((c) => c._id)
  )
  const [validated, setValidated] = useState(false)
  const [errorDuplicates, setErrorDuplicates] = useState(false)
  const [msg, setMsg] = useState('Duplicates are present')

  const [defaultSurvey, setDefaultSurvey] = useState({})

  const surveyTemplateList = useSelector((state) => state.surveyTemplateList)
  const { loading, error, surveys } = surveyTemplateList

  const studyCreated = useSelector((state) => state.studyCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = studyCreated

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
        _id: study._id,
        name,
        description,
        surveyIds: items,
      }

      dispatch(updateStudy(newStudy))
    }
  }

  useEffect(() => {
    dispatch(listSurveyTemplates())
  }, [dispatch])

  useEffect(() => {
    if (surveys) {
      if (surveys.length > 0) setDefaultSurvey(surveys[0])
      else setDefaultSurvey({})
    }
  }, [dispatch, surveys])

  useEffect(() => {
    console.log(items)
  }, [dispatch, items.length])

  return (
    <>
      <Button variant='light' style={{ float: 'right' }} onClick={handleShow}>
        <i className='fas fa-edit'></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit study</Modal.Title>
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

              <Form.Label className='mt-2'>
                <h5>Description</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='description'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a description.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Label className='mt-2'>
              <h5>Select surveys</h5>
            </Form.Label>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
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

                {items.map((item, index) => (
                  <Form.Group>
                    <Form.Control
                      as='select'
                      defaultValue={
                        surveysSelected[index] !== undefined
                          ? surveysSelected[index]._id
                          : false
                      }
                      onChange={(event) => handleInputChange(index, event)}
                      key={item}
                    >
                      {surveys.map((d) => (
                        <option
                          value={d._id}
                          key={d._id}
                          selected={item === d._id}
                        >
                          {d.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                ))}
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

export default EditDiseaseModal
