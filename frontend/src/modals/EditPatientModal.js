import React, { useState, useEffect, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, Alert, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  updatePatient,
  listPatients,
  listPatientsAndDisease,
} from '../actions/patientActions'
import { listDiseases } from '../actions/diseaseActions'

const EditPatientModal = ({ patient }) => {
  const [name, setName] = useState(patient.name)
  const [surname, setSurname] = useState(patient.surname)
  const [age, setAge] = useState(patient.age)
  const [therapy, setTherapy] = useState(patient.therapy)

  const [items, setItems] = useState(patient.diseases)
  const [currentDiseases, setCurrentDiseases] = useState(patient.diseases)
  const [defaultDisease, setDefaultDisease] = useState({})

  const [validated, setValidated] = useState(false)
  const [errorDuplicates, setErrorDuplicates] = useState(false)
  const [msg, setMsg] = useState('Duplicates are present')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const diseaseList = useSelector((state) => state.diseaseList)
  const { loading, error, diseases } = diseaseList

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

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
      const newPatient = {
        _id: patient._id,
        name,
        surname,
        age,
        therapy,
        items,
      }
      dispatch(updatePatient(newPatient)).then(() => {
        dispatch(listPatients())
        dispatch(listPatientsAndDisease())
      })
    }
  }

  useEffect(() => {
    console.log(patient.diseases)
    let isMounted = true
    dispatch(listDiseases()).then(() => {
      if (isMounted) {
        setDefaultDisease(diseases[0])
      }
    })
    return () => {
      isMounted = false
    }
  }, [dispatch, show])

  const handleAddFields = () => {
    const values = [...items]
    values.push(defaultDisease._id)
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

  useEffect(() => {}, [items.length])

  return (
    <>
      <Button variant='light' style={{ float: 'right' }} onClick={handleShow}>
        <i className='fas fa-edit'></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorDuplicates ? <Alert variant={'danger'}>{msg}</Alert> : <></>}

            <Form.Group controlId='nameValidation'>
              <Form.Label className='mt-2'>
                <h5>Name</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='surnameValidation'>
              <Form.Label className='mt-2'>
                <h5>Surname</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='surname'
                  placeholder='Enter surname'
                  value={surname}
                  required
                  onChange={(e) => setSurname(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a surname.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='surnameValidation'>
              <Form.Label className='mt-2'>
                <h5>Birth date</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='date'
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please write date of birth.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Label className='mt-2'>
              <h5>Therapy</h5>
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              type='therapy'
              placeholder='Enter therapy'
              value={therapy}
              onChange={(e) => setTherapy(e.target.value)}
            />

            <Form.Label className='mt-2'>
              <h5>Select diseases</h5>
            </Form.Label>

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
                  <Form.Group>
                    <Form.Control
                      as='select'
                      defaultValue={currentDiseases[index]}
                      onChange={(event) => handleInputChange(index, event)}
                      key={item}
                    >
                      {diseases.map((d) => (
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

export default EditPatientModal
