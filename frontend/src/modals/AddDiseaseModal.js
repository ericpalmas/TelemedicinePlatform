import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
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

  const submitHandler = (e) => {
    e.preventDefault()
    const newDisease = {
      name,
      description,
    }
    dispatch(createDisease(newDisease))
  }

  useEffect(() => {
    if (successCreate) {
      dispatch(listDiseases())
      setName('')
      setDescription('')
    }
  }, [dispatch, successCreate])

  return (
    <>
      <Button variant="primary" size="lg" className="ml-3" onClick={handleShow}>
        New disease
      </Button>

      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New disease</Modal.Title>
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
            <h5>Description</h5>
          </Form.Label>
          <Form.Control
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

export default AddDiseaseModal
