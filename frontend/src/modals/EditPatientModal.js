import React, { useState, useEffect, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updatePatient, listPatients } from '../actions/patientActions'
import { listDiseases } from '../actions/diseaseActions'

const EditPatientModal = ({ patient }) => {
  const [name, setName] = useState(patient.name)
  const [surname, setSurname] = useState(patient.surname)
  const [age, setAge] = useState(patient.age)
  const [therapy, setTherapy] = useState(patient.therapy)

  // array of diseases
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')

  const dispatch = useDispatch()

  //   const patientCreated = useSelector((state) => state.patientCreate)
  //   const {
  //     loading: loadingCreate,
  //     success: successCreate,
  //     error: errorCreate,
  //     disease: diseaseCreate,
  //   } = patientCreated

  const diseaseList = useSelector((state) => state.diseaseList)
  const { loading, error, diseases } = diseaseList
  const defaultDisease = diseases[0]

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
      items,
    }

    // dispatch(createPatient(newPatient))
    // setItems([])
    // console.log(items)
  }

  useEffect(() => {
    dispatch(listDiseases())

    // if (successCreate) {
    //   dispatch(listPatients())
    //   setName('')
    //   setSurname('')
    //   setAge('')
    //   setTherapy('')
    //   setItems([])
    // }
  }, [dispatch])

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
    console.log(items)
  }

  return (
    <>
      <Button variant="light" style={{ float: 'right' }} onClick={handleShow}>
        <i className="fas fa-edit"></i>
      </Button>

      {/* {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingCreate && <Loader />} */}
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

          <Form.Label className="mt-2">
            <h5>Select diseases</h5>
          </Form.Label>

          <Button
            className="ml-2 mr-2"
            variant="light"
            id="addRemoveButton"
            onClick={handleRemoveLastFields}
            inline="true"
          >
            -
          </Button>

          <Button
            className="ml-2 mr-2"
            variant="light"
            id="addRemoveButton"
            onClick={handleAddFields}
            inline="true"
          >
            +
          </Button>

          {items.map((item, index) => (
            <Fragment key={`${item}~${index}`}>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={(event) => handleInputChange(index, event)}
                >
                  {diseases.map((d) => (
                    <option value={d._id} key={d._id}>
                      {d.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Fragment>
          ))}
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

export default EditPatientModal
