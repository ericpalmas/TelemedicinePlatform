// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'

// import Modal from 'react-bootstrap/Modal'
// import { Button, Form, FormLabel } from 'react-bootstrap'
// import { createPatientDevice } from '../actions/patientActions'

// const AddPatientDeviceModal = ({ history }) => {
//   const [macAddress, setMacAddress] = useState("")
//   const [show, setShow] = useState(false)
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)

//   const dispatch = useDispatch()

//   const submitHandler = (e) => {
//     e.preventDefault()
//     const patientDevice = {
//       macAddress,
//       patient: device.patient,
//     }

//     dispatch(createPatientDevice(patientDevice))
//   }

//   useEffect(() => {
//   }, [dispatch])

//   return (
//     <>
//       <Button variant='light' style={{ float: 'right' }} onClick={handleShow}>
//         <i className='fas fa-edit'></i>
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit mac address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Label className='mt-2'>
//             <h5>Mac Address</h5>
//           </Form.Label>
//           <Form.Control
//             type='name'
//             placeholder='Enter mac address'
//             value={macAddress}
//             onChange={(e) => setMacAddress(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleClose}>
//             Close
//           </Button>
//           <Form onSubmit={submitHandler}>
//             <Button variant='primary' type='submit' onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default AddPatientDeviceModal
