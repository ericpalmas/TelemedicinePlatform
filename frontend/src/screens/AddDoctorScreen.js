import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainter'
import { register } from '../actions/doctorActions'
import { DOCTOR_REGISTER_RESET } from '../constants/doctorConstants'
//import { listProductDetails, updateProduct } from '../actions/productActions'
//

const AddDoctorScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.doctorRegister)
  const { loading, error, success, userInfo } = userRegister

  useEffect(() => {
    // problema qua, non va bene user info, ci vuole success e poi rimetterlo a zero ogni volta che faccio dispatch
    if (success) {
      dispatch({ type: DOCTOR_REGISTER_RESET })
      history.push('/admin/doctorlist')
    }
  }, [dispatch, history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, surname, email, password))
    }
  }

  return (
    <>
      <Link to='/admin/doctorlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Register new doctor</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid='insertName'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='surname'>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter surname'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' data-testid='registerButton'>
            Register
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  )
}

export default AddDoctorScreen
