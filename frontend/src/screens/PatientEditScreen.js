import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, InputGroup, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainter'
//import { getDoctorDetails, updateDoctor } from '../actions/doctorActions'
import { patientDetails, updatePatient } from '../actions/patientActions'
import { listPatientDiseases, listDiseases } from '../actions/diseaseActions'

import { PATIENT_UPDATE_RESET } from '../constants/patientConstants'

const PatientEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [therapy, setTherapy] = useState('')

  const [items, setItems] = useState([])
  const [currentDiseases, setCurrentDiseases] = useState([])
  const [defaultDisease, setDefaultDisease] = useState({})
  const [diseasesUploaded, setDiseasesUploaded] = useState(false)
  const [patientDetailUploaded, setPatientDetailUploaded] = useState(false)
  const [patientDiseasesUploaded, setPatientDiseasesUploaded] = useState(false)

  const [validated, setValidated] = useState(false)
  const [errorDuplicates, setErrorDuplicates] = useState(false)
  const [msg, setMsg] = useState('Duplicates are present')
  const dispatch = useDispatch()

  const patientDetail = useSelector((state) => state.patientDetail)
  const { loading, error, patient } = patientDetail

  const diseaseList = useSelector((state) => state.diseaseList)
  const {
    loading: loadingDiseaseList,
    error: loadingErrorList,
    diseases,
  } = diseaseList

  const patientDiseasesList = useSelector((state) => state.patientDiseasesList)
  const {
    loading: loadingPatientDiseases,
    error: errorPatientDiseases,
    patientDiseases,
  } = patientDiseasesList

  const patientUpdate = useSelector((state) => state.patientUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate

  const setPatientsData = useCallback(() => {
    if (patientDetailUploaded) {
      setName(patient.name)
      setSurname(patient.surname)
      setAge(patient.age)
      setTherapy(patient.therapy)
    }
  }, [patientDetailUploaded])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET })
      history.push('/admin/patientlist')
    } else {
      if (userId != undefined) {
        dispatch(patientDetails(userId)).then(() => {
          setPatientDetailUploaded(true)
        })
        setPatientsData()
      }
    }
  }, [dispatch, history, userId, successUpdate, setPatientsData])

  const patientDiseasesElaboration = useCallback(() => {
    if (patientDiseasesUploaded) {
      let itemsUpdated = patientDiseases.map((a) => a.disease._id)
      setItems(itemsUpdated)
      setCurrentDiseases(itemsUpdated)
    }
  }, [patientDiseasesUploaded])

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(listPatientDiseases(userId)).then(() => {
        setPatientDiseasesUploaded(true)
        patientDiseasesElaboration()
      })
    }
  }, [dispatch, history, userId, patientDiseasesElaboration])

  const setDefault = useCallback(() => {
    console.log(diseasesUploaded)
    if (diseasesUploaded) setDefaultDisease(diseases[0])
  }, [diseasesUploaded])

  useEffect(() => {
    dispatch(listDiseases()).then(() => {
      setDiseasesUploaded(true)
      setDefault()
    })
  }, [dispatch, setDefault])

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

  // const submitHandler = (e) => {
  //   var findError = false

  //   const form = e.currentTarget
  //   if (form.checkValidity() === false) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }

  //   setValidated(true)

  //   if (hasDuplicates(items)) {
  //     setErrorDuplicates(true)
  //     findError = true
  //   } else {
  //     setErrorDuplicates(false)
  //   }

  //   console.log(findError)

  //   if (!findError) {
  //     const newPatient = {
  //       _id: patient._id,
  //       name,
  //       surname,
  //       age,
  //       therapy,
  //       items,
  //     }
  //     console.log(newPatient)
  //     //dispatch(updatePatient(newPatient))
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    var findError = false

    console.log(items)
    if (hasDuplicates(items)) {
      setErrorDuplicates(true)
      findError = true
    } else {
      setErrorDuplicates(false)
    }

    console.log(errorDuplicates)

    if (!findError) {
      const newPatient = {
        _id: patient._id,
        name,
        surname,
        age,
        therapy,
        items,
      }
      dispatch(updatePatient(newPatient))
    }
  }

  return (
    <>
      <Link to='/admin/patientlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Patient</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading && loadingPatientDiseases && loadingDiseaseList ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {errorDuplicates ? <Alert variant={'danger'}>{msg}</Alert> : <></>}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <Form.Group controlId='surnameValidation'>
              <Form.Label className='mt-2'>Birth date</Form.Label>
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

            <Form.Group controlId='surname'>
              <Form.Label>Therapy</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter age'
                value={therapy}
                onChange={(e) => setTherapy(e.target.value)}
              ></Form.Control>

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
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PatientEditScreen
