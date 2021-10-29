import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
//import { updateDisease, listDiseases } from '../actions/diseaseActions'
import { listSurveyTemplates } from '../actions/surveyActions'

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
  // const [defaultSurvey, setDefaultSurvey] = useState(
  //   surveys.length > 0 ? surveys[0] : {}
  // )

  const [defaultSurvey, setDefaultSurvey] = useState({})

  const surveyTemplateList = useSelector((state) => state.surveyTemplateList)
  const { loading, error, surveys } = surveyTemplateList

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

  const submitHandler = (e) => {
    e.preventDefault()
    const newDisease = {
      _id: study._id,
      name,
      description,
    }

    // dispatch(updateDisease(newDisease)).then(() => {
    //   dispatch(listDiseases())
    // })
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
        <Modal.Header closeButton>
          <Modal.Title>Edit study</Modal.Title>
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
          <Form.Label className='mt-2'>
            <h5>Description</h5>
          </Form.Label>
          <Form.Control
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
          <Form onSubmit={submitHandler}>
            <Button variant='primary' type='submit' onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditDiseaseModal
