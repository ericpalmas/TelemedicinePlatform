import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { updateDisease, listDiseases } from '../actions/diseaseActions'

const EditDiseaseModal = ({ history, disease }) => {
  const [name, setName] = useState(disease.name)
  const [description, setDescription] = useState(disease.description)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    const newDisease = {
      _id: disease._id,
      name,
      description,
    }

    dispatch(updateDisease(newDisease)).then(() => {
      dispatch(listDiseases())
    })
  }

  useEffect(() => {}, [dispatch])

  return (
    <>
      <Button variant="light" style={{ float: 'right' }} onClick={handleShow}>
        <i className="fas fa-edit"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit disease</Modal.Title>
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

export default EditDiseaseModal
