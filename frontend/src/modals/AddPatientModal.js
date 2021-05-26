import React, { useState, useEffect, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  createPatient,
  listPatients,
  listPatientsAndDisease,
} from '../actions/patientActions'
import { listDiseases } from '../actions/diseaseActions'

const AddPatientModal = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  //const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState('')
  const [therapy, setTherapy] = useState('')

  // array of diseases
  const [items, setItems] = useState([])
  const [defaultDisease, setDefaultDisease] = useState({})

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)
  const [duplicates, setDuplicates] = useState(false)

  const dispatch = useDispatch()

  const diseaseList = useSelector((state) => state.diseaseList)
  const { loading, error, diseases } = diseaseList

  const submitHandler = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    const newPatient = {
      name,
      surname,
      // age: birthDate,
      age,
      therapy,
      items,
    }

    console.log(newPatient)

    dispatch(createPatient(newPatient)).then(() => {
      setItems([])
      dispatch(listPatients())
      dispatch(listPatientsAndDisease())
    })
  }

  useEffect(() => {
    let isMounted = true
    dispatch(listDiseases()).then(() => {
      if (isMounted) {
        setDefaultDisease(diseases[0])
        setName('')
        setSurname('')
        setAge('')
        setTherapy('')
        setItems([])
        console.log(diseases)
      }
    })
    return () => {
      isMounted = false
    }
  }, [dispatch, show])

  function hasDuplicates(array) {
    return new Set(array).size !== array.length
  }

  const handleAddFields = () => {
    const values = [...items]
    values.push(defaultDisease._id)
    setItems(values)
    //console.log(items)
  }

  const handleRemoveLastFields = () => {
    const values = [...items]
    values.splice(items.length - 1, 1)
    setItems(values)
    //console.log(items)
  }

  const handleInputChange = (index, event) => {
    console.log(index)
    //event.preventDefault()
    const values = [...items]
    values[index] = event.target.value
    setItems(values)
    console.log(items)
  }

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        style={{ float: 'right' }}
        onClick={handleShow}
      >
        <i className="fas fa-plus mr-2"></i>
        New patient
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="nameValidation">
              <Form.Label className="mt-2">
                <h5>Name</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="surnameValidation">
              <Form.Label className="mt-2">
                <h5>Surname</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="surname"
                  placeholder="Enter surname"
                  value={surname}
                  required
                  onChange={(e) => setSurname(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a surname.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="surnameValidation">
              <Form.Label className="mt-2">
                <h5>Data di nascita</h5>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  required
                  // value={birthDate}
                  // onChange={(e) => setBirthDate(e.target.value)}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please write date of birth.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label className="mt-2">
              <h5>Therapy</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
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

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {items.map((item, index) => (
                  // <Form.Group>
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
                  // </Form.Group>
                ))}
              </>
            )}
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

export default AddPatientModal

// import React, { useState, useEffect, Fragment } from 'react'
// import Modal from 'react-bootstrap/Modal'
// import { Button, Form } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import {
//   createPatient,
//   listPatients,
//   listPatientsAndDisease,
// } from '../actions/patientActions'
// import { listDiseases } from '../actions/diseaseActions'

// const AddPatientModal = () => {
//   const [name, setName] = useState('')
//   const [surname, setSurname] = useState('')
//   const [age, setAge] = useState('')
//   const [therapy, setTherapy] = useState('')

//   // array of diseases
//   const [items, setItems] = useState([])
//   const [defaultDisease, setDefaultDisease] = useState({})

//   const [show, setShow] = useState(false)
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)

//   const dispatch = useDispatch()

//   const diseaseList = useSelector((state) => state.diseaseList)
//   const { loading, error, diseases } = diseaseList

//   const submitHandler = (e) => {
//     e.preventDefault()
//     const newPatient = {
//       name,
//       surname,
//       age,
//       therapy,
//       items,
//     }

//     dispatch(createPatient(newPatient)).then(() => {
//       setItems([])
//       dispatch(listPatients())
//       dispatch(listPatientsAndDisease())
//     })
//   }

//   useEffect(() => {
//     let isMounted = true
//     dispatch(listDiseases()).then(() => {
//       if (isMounted) {
//         setDefaultDisease(diseases[0])
//         setName('')
//         setSurname('')
//         setAge('')
//         setTherapy('')
//         setItems([])
//       }
//     })
//     return () => {
//       isMounted = false
//     }
//   }, [dispatch, show])

//   const handleAddFields = () => {
//     const values = [...items]
//     values.push(defaultDisease._id)
//     setItems(values)
//   }

//   const handleRemoveLastFields = () => {
//     const values = [...items]
//     values.splice(items.length - 1, 1)
//     setItems(values)
//   }

//   const handleInputChange = (index, event) => {
//     event.preventDefault()
//     const values = [...items]
//     values[index] = event.target.value
//     setItems(values)
//   }

//   return (
//     <>
//       <Button
//         variant="primary"
//         size="lg"
//         style={{ float: 'right' }}
//         onClick={handleShow}
//       >
//         <i className="fas fa-plus mr-2"></i>
//         New patient
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>New patient</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Label className="mt-2">
//             <h5>Name</h5>
//           </Form.Label>
//           <Form.Control
//             type="name"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <Form.Label className="mt-2">
//             <h5>Surname</h5>
//           </Form.Label>
//           <Form.Control
//             type="surname"
//             placeholder="Enter surname"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//           />

//           <Form.Label className="mt-2">
//             <h5>Age</h5>
//           </Form.Label>
//           <Form.Control
//             type="age"
//             placeholder="Enter age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//           <Form.Label className="mt-2">
//             <h5>Therapy</h5>
//           </Form.Label>
//           <Form.Control
//             type="therapy"
//             placeholder="Enter therapy"
//             value={therapy}
//             onChange={(e) => setTherapy(e.target.value)}
//           />

//           <Form.Label className="mt-2">
//             <h5>Select diseases</h5>
//           </Form.Label>

//           <Button
//             className="ml-2 mr-2"
//             variant="light"
//             id="addRemoveButton"
//             onClick={handleRemoveLastFields}
//             inline="true"
//           >
//             -
//           </Button>

//           <Button
//             className="ml-2 mr-2"
//             variant="light"
//             id="addRemoveButton"
//             onClick={handleAddFields}
//             inline="true"
//           >
//             +
//           </Button>

//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message variant="danger">{error}</Message>
//           ) : (
//             <>
//               {items.map((index) => (
//                 <Form.Group>
//                   <Form.Control
//                     as="select"
//                     onChange={(event) => handleInputChange(index, event)}
//                   >
//                     {diseases.map((d) => (
//                       <option value={d._id} key={d._id}>
//                         {d.name}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               ))}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Form onSubmit={submitHandler}>
//             <Button variant="primary" type="submit" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default AddPatientModal
