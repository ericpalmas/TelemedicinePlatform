import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createPatient, listPatients } from '../actions/patientActions'

const AddPatientModal = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [therapy, setTherapy] = useState('')

  const dispatch = useDispatch()

  const patientCreated = useSelector((state) => state.patientCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    disease: diseaseCreate,
  } = patientCreated

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitHandler = (e) => {
    e.preventDefault()
    const newPatient = {
      name,
      surname,
      age,
      therapy,
    }
    dispatch(createPatient(newPatient))
  }

  useEffect(() => {
    if (successCreate) {
      dispatch(listPatients())
      setName('')
      setSurname('')
      setAge('')
      setTherapy('')
    }
  }, [dispatch, successCreate])

  return (
    <>
      <Button variant="primary" size="lg" className="ml-3" onClick={handleShow}>
        New patient
      </Button>

      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-2">
            <h5>Name</h5>
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Label className="mt-2">
            <h5>Surname</h5>
          </Form.Label>
          <Form.Control
            type="surname"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <Form.Label className="mt-2">
            <h5>Age</h5>
          </Form.Label>
          <Form.Control
            type="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Form.Label className="mt-2">
            <h5>Therapy</h5>
          </Form.Label>
          <Form.Control
            type="therapy"
            placeholder="Enter therapy"
            value={therapy}
            onChange={(e) => setTherapy(e.target.value)}
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

export default AddPatientModal
