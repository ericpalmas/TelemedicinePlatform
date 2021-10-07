import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import {
  Button,
  Form,
  FormLabel,
  InputGroup,
  Row,
  Col,
  Alert,
} from 'react-bootstrap'
import { surveyTimeSlotList, updateTimeSlots } from '../actions/timeSlotActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const AddSurveyTIme = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const handleClose = () => setShow(false)
  //const handleShow = () => setShow(true)

  const handleShow = () => {
    setShow(true)
    setItems(surveyTimeSlots)
  }
  const [validated, setValidated] = useState(false)
  const [items, setItems] = useState([])
  const [msg, setMsg] = useState('Start is date greather than end date')
  const [errorStartEnd, setErrorStartEnd] = useState(false)

  var currentSurveyId = localStorage.getItem('surveyId').split('"')[1]

  const surveyTimeSlotsList = useSelector((state) => state.surveyTimeSlotList)
  const { loading, error, surveyTimeSlots } = surveyTimeSlotsList

  const timeSlotsUpdated = useSelector((state) => state.updateTimeSlot)
  const {
    loading: loadingCreate,
    success: successUpdate,
    error: errorCreate,
    timeSlots: surveyCreate,
  } = timeSlotsUpdated

  const updateItems = useCallback(() => {
    setItems(surveyTimeSlots)
  }, [dispatch, currentSurveyId, surveyTimeSlots.length || 0, loading])

  useEffect(() => {
    updateItems()
    dispatch(surveyTimeSlotList(currentSurveyId))
  }, [dispatch, currentSurveyId, successUpdate, updateItems])

  const addAnswer = () => {
    setItems([
      ...items,
      {
        survey: currentSurveyId,
        startHour: 0,
        startMinutes: 0,
        endHour: 0,
        endMinutes: 0,
      },
    ])
  }

  const removeAnswer = () => {
    const values = [...items]
    values.splice(values.length - 1, 1)
    setItems(values)
  }

  // start time
  const incrementStartHour = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].startHour === 23) {
      values[index].startHour = 0
      setItems(values)
      console.log(items)
    } else {
      values[index].startHour = values[index].startHour + 1
      setItems(values)
      console.log(items)
    }
  }

  const decrementStartHour = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].startHour === 0) {
      values[index].startHour = 23
      setItems(values)
      console.log(items)
    } else {
      values[index].startHour = values[index].startHour - 1
      setItems(values)
      console.log(items)
    }
  }

  const decrementStartMinutes = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].startMinutes === 0) {
      values[index].startMinutes = 59
      setItems(values)
      console.log(items)
    } else {
      values[index].startMinutes = values[index].startMinutes - 1
      setItems(values)
      console.log(items)
    }
  }

  const incrementStartMinutes = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].startMinutes === 59) {
      values[index].startMinutes = 0
      setItems(values)
      console.log(items)
    } else {
      values[index].startMinutes = values[index].startMinutes + 1
      setItems(values)
      console.log(items)
    }
  }

  // end time
  const incrementEndHour = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].endHour === 23) {
      values[index].endHour = 0
      setItems(values)
      console.log(items)
    } else {
      values[index].endHour = values[index].endHour + 1
      setItems(values)
      console.log(items)
    }
  }

  const decrementEndHour = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].endHour === 0) {
      values[index].endHour = 23
      setItems(values)
      console.log(items)
    } else {
      values[index].endHour = values[index].endHour - 1
      setItems(values)
      console.log(items)
    }
  }

  const decrementEndMinutes = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].endMinutes === 0) {
      values[index].endMinutes = 59
      setItems(values)
      console.log(items)
    } else {
      values[index].endMinutes = values[index].endMinutes - 1
      setItems(values)
      console.log(items)
    }
  }

  const incrementEndMinutes = (index) => {
    console.log(index)
    var values = [...items]
    if (values[index].endMinutes === 59) {
      values[index].endMinutes = 0
      setItems(values)
      console.log(items)
    } else {
      values[index].endMinutes = values[index].endMinutes + 1
      setItems(values)
      console.log(items)
    }
  }

  // const submitHandler = (e) => {
  //   e.preventDefault()

  //   items.forEach((item, i) => {
  //     if (item.startHour > item.endHour) {
  //       setErrorStartEnd(true)
  //     } else {
  //       if (item.startMinutes > item.endMinutes) {
  //         setErrorStartEnd(true)
  //       } else {
  //         setErrorStartEnd(false)

  //         const result = {
  //           survey: currentSurveyId,
  //           items,
  //         }
  //         // console.log(result)
  //         // console.log('DISPATCH')
  //         dispatch(updateTimeSlots(result))
  //       }
  //     }
  //   })

  //   const form = e.currentTarget
  //   if (form.checkValidity() === false) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }
  //   setValidated(true)

  //   dispatch(updateTimeSlots(result))
  // }

  // const submitHandler = (e) => {
  //   //e.preventDefault()

  //   // const result = {
  //   //   survey: currentSurveyId,
  //   //   items,
  //   // }

  //   items.forEach((item, i) => {
  //     if (item.startHour > item.endHour) {
  //       setErrorStartEnd(true)
  //     } else {
  //       if (item.startMinutes > item.endMinutes) {
  //         setErrorStartEnd(true)
  //       } else {
  //         setErrorStartEnd(false)

  //         const result = {
  //           survey: currentSurveyId,
  //           items,
  //         }

  //         dispatch(updateTimeSlots(result))
  //       }
  //     }
  //   })

  //   // dispatch(updateTimeSlots(result))
  // }

  const submitHandler = (e) => {
    var findError = false
    for (var i = 0; i < items.length; i++) {
      if (items[i].startHour > items[i].endHour) {
        setErrorStartEnd(true)
        setValidated(false)
        findError = true
        break
      } else {
        if (items[i].startMinutes > items[i].endMinutes) {
          setErrorStartEnd(true)
          setValidated(false)
          findError = true
          break
        } else {
          setErrorStartEnd(false)
          setValidated(true)
        }
      }
    }

    if (!findError) {
      const result = {
        survey: currentSurveyId,
        items,
      }
      dispatch(updateTimeSlots(result))
    } else {
      e.preventDefault()
    }
  }

  return (
    <>
      <FormLabel variant='secondary' onClick={handleShow} className='ml-3'>
        Add time
      </FormLabel>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi fascia oraria </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorStartEnd ? <Alert variant={'danger'}>{msg}</Alert> : <></>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='validationCustom02'>
              <Button
                className='ml-2 mr-2'
                variant='light'
                id='addRemoveButton'
                onClick={removeAnswer}
                inline
              >
                -
              </Button>

              <Button
                className='ml-2 mr-2'
                variant='light'
                id='addRemoveButton'
                onClick={addAnswer}
                inline
              >
                +
              </Button>
              <br />
              <br />
              <Row>
                <Col>
                  <Form.Label className='mt-2'>
                    <h5>Start time</h5>
                  </Form.Label>
                </Col>

                <Col>
                  <Form.Label className='mt-2'>
                    <h5>End time</h5>
                  </Form.Label>
                </Col>
              </Row>

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  {Array.isArray(items) ? (
                    items.map((item, index) => (
                      <>
                        <Form inline>
                          {/* <InputGroup> */}
                          <Row>
                            <Col>
                              <Form.Control
                                type='text'
                                name='state'
                                value={item.startHour}
                                required
                                style={{
                                  width: '4rem',
                                  alignItems: 'flex-start',
                                }}
                              />
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => incrementStartHour(index)}
                                inline
                              >
                                +
                              </Button>
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => decrementStartHour(index)}
                                inline
                              >
                                -
                              </Button>

                              <Form.Control
                                type='text'
                                name='state'
                                style={{ width: '4rem' }}
                                value={item.startMinutes}
                                //required
                              />
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => incrementStartMinutes(index)}
                                inline
                              >
                                +
                              </Button>
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => decrementStartMinutes(index)}
                                inline
                              >
                                -
                              </Button>
                            </Col>

                            <Col>
                              <Form.Control
                                type='text'
                                name='state'
                                value={item.endHour}
                                //required
                                style={{
                                  width: '4rem',
                                  alignItems: 'flex-start',
                                }}
                              />
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => incrementEndHour(index)}
                                inline
                              >
                                +
                              </Button>
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => decrementEndHour(index)}
                                inline
                              >
                                -
                              </Button>

                              <Form.Control
                                type='text'
                                name='state'
                                style={{ width: '4rem' }}
                                value={item.endMinutes}
                                //required
                              />
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => incrementEndMinutes(index)}
                                inline
                              >
                                +
                              </Button>
                              <Button
                                className='ml-0 mr-0'
                                variant='light'
                                id='addRemoveButton'
                                onClick={() => decrementEndMinutes(index)}
                                inline
                              >
                                -
                              </Button>
                            </Col>
                          </Row>

                          <br />
                          <br />
                        </Form>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </>
              )}

              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' type='submit'>
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default AddSurveyTIme
