import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, InputGroup } from 'react-bootstrap'
import { createDisease, listDiseases } from '../actions/diseaseActions'

const AddDiseaseModal = ({ history }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const diseaseCreated = useSelector((state) => state.diseaseCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    disease: diseaseCreate,
  } = diseaseCreated

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)

  const submitHandler = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    const newDisease = {
      name,
      description,
    }
    dispatch(createDisease(newDisease)).then(() => {
      dispatch(listDiseases())
    })
  }

  useEffect(() => {}, [dispatch])

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        style={{ float: 'right' }}
        onClick={handleShow}
      >
        <i className="fas fa-plus mr-2"></i>
        New disease
      </Button>

      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {/* {loadingCreate && <Loader />} */}
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New disease</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="validationCustom02">
              <Form.Label className="mt-2">
                <h5>Name</h5>
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
            {/* <Form onSubmit={submitHandler}> */}
            {/* <Button variant="primary" type="submit" onClick={handleClose}> */}

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            {/* </Form> */}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddDiseaseModal
