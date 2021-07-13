import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, InputGroup } from 'react-bootstrap'

import { createSensor, listSensors } from '../actions/sensorActions'

const AddSensorModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const sensorCreated = useSelector((state) => state.sensorCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    sensor: sensore,
  } = sensorCreated

  const sensorEnabled = useSelector((state) => state.sensorEnable)
  const {
    loading: loadingEnable,
    success: successEnable,
    error: errorEnable,
    sensorEnable: sensorEnable,
  } = sensorEnabled

  const submitHandler = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    const newSensor = {
      name,
      description,
    }

    dispatch(createSensor(newSensor))
  }

  useEffect(() => {}, [dispatch, successEnable])

  return (
    <>
      <Button variant="link" onClick={handleShow} style={{ color: '#fff' }}>
        New sensor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New sensor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="validationCustom02">
              <Form.Label className="mt-2">
                <h5>Sensor name</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="name"
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
              as="textarea"
              rows={3}
              type="description"
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

export default AddSensorModal
