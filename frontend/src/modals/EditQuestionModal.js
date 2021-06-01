import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Modal from 'react-bootstrap/Modal'
import {
  Button,
  Form,
  FormLabel,
  Col,
  Card,
  Image,
  Transformation,
  ButtonGroup,
  Figure,
  DropdownButton,
} from 'react-bootstrap'
import * as MdIcons from 'react-icons/md'
import { updateQuestion } from '../actions/questionActions'
import { surveyDetails } from '../actions/surveyActions'
import Dropdown from 'react-bootstrap/Dropdown'
import icons from '../icons.js'

const EditQuestionModal = ({ question }) => {
  var surv = localStorage.getItem('surveyId')

  // Open and close modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // array of possible answers
  const [items, setItems] = useState(question.answers)
  const [itemName, setItemName] = useState('')
  const [text, setText] = useState(question.question.text)
  const [radio, setRadio] = useState(question.question.radio)
  const [check, setCheck] = useState(question.question.check)
  const [open, setOpen] = useState(question.question.open)
  const [slider, setSlider] = useState(question.question.slider)
  const [trueFalse, setTrueFalse] = useState(question.question.trueFalse)
  const [incrementDecrement, setIncrementDecrement] = useState(
    question.question.incrementDecrement,
  )
  const [insertTime, setInsertTime] = useState(question.question.insertTime)

  // type of question selected
  const [radioOption, setRadioOption] = useState('')

  // for slider and true false
  const [firstOfferedAnswer, setFirstOfferedAnswer] = useState('')
  const [secondOfferedAnswer, setSecondOfferedAnswer] = useState('')

  const [firstImageOffered, setFirstImageOffered] = useState(-1)
  const [secondImageOffered, setSecondImageOffered] = useState(-1)

  const [selectedValue, setSelectedValue] = useState(-1)
  const [validated, setValidated] = useState(false)

  const setRadioOptionValue = (event) => {
    setRadioOption(event.target.value)
    switch (event.target.value) {
      case 'open':
        setOpen(true)
        setRadio(false)
        setCheck(false)
        setSlider(false)
        setTrueFalse(false)
        setIncrementDecrement(false)
        setInsertTime(false)
        break
      case 'multiRadio':
        setOpen(false)
        setRadio(true)
        setCheck(false)
        setSlider(false)
        setTrueFalse(false)
        setIncrementDecrement(false)
        setInsertTime(false)
        break
      case 'multiCheck':
        setOpen(false)
        setRadio(false)
        setCheck(true)
        setSlider(false)
        setTrueFalse(false)
        setIncrementDecrement(false)
        setInsertTime(false)
        break
      case 'slider':
        setOpen(false)
        setRadio(false)
        setCheck(false)
        setSlider(true)
        setTrueFalse(false)
        setIncrementDecrement(false)
        setInsertTime(false)
        break
      case 'trueFalse':
        setOpen(false)
        setRadio(false)
        setCheck(false)
        setSlider(false)
        setTrueFalse(true)
        setIncrementDecrement(false)
        setInsertTime(false)
        break
      case 'incrementDecrement':
        setOpen(false)
        setRadio(false)
        setCheck(false)
        setSlider(false)
        setTrueFalse(false)
        setIncrementDecrement(true)
        setInsertTime(false)
        break
      case 'insertTime':
        setOpen(false)
        setRadio(false)
        setCheck(false)
        setSlider(false)
        setTrueFalse(false)
        setIncrementDecrement(false)
        setInsertTime(true)
        break
      default:
    }
    setItems([])
  }

  const dispatch = useDispatch()

  const diseaseCreated = useSelector((state) => state.diseaseCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    disease: diseaseCreate,
  } = diseaseCreated

  const questionUpdated = useSelector((state) => state.questionUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    question: questionUpdate,
  } = questionUpdated

  const addAnswer = () => {
    if (itemName !== '') {
      setItems([
        ...items,
        {
          _id: items.length,
          text: itemName,
          selected: false,
          image: selectedValue,
        },
      ])
    }
  }

  const removeAnswer = () => {
    const values = [...items]
    values.splice(values.length - 1, 1)
    setItems(values)
  }

  const submitHandler = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    var newQuestion = {
      _id: question.question._id,
      text,
      radio,
      check,
      open,
      slider,
      trueFalse,
      incrementDecrement,
      insertTime,
      survey: surv.split('"')[1],
      offeredAnswers: items,
    }
    if (newQuestion.slider || newQuestion.trueFalse) {
      newQuestion.offeredAnswers.push({
        text: firstOfferedAnswer,
        image: firstImageOffered,
      })
      newQuestion.offeredAnswers.push({
        text: secondOfferedAnswer,
        image: secondImageOffered,
      })
    }
    dispatch(updateQuestion(newQuestion)).then(() => {
      dispatch(surveyDetails(surv.split('"')[1]))
    })
  }

  const handleSelect = (e, index) => {
    var values = [...items]
    values[index].image = parseInt(e)
    setItems(values)
  }

  const handleSelectText = (e, index) => {
    var values = [...items]
    values[index].text = e.target.value
    setItems(values)
    console.log(items)
  }

  useEffect(() => {
    console.log(question)
    if (successCreate) {
      dispatch(surveyDetails(surv.split('"')[1]))
    }
  }, [dispatch, successCreate])

  return (
    <>
      <Button
        style={{
          float: 'right',
          display: 'inline-block',
        }}
        variant="light"
        className="btn-sm"
        onClick={handleShow}
      >
        <MdIcons.MdEdit size={30} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Question creation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="validationCustom01">
              <Form.Label className="mt-2">
                <h5>Question text</h5>
              </Form.Label>
              <Form.Control
                placeholder="Enter text"
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Insert question text
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label className="mt-4">
              <h5>Question type</h5>
            </Form.Label>

            <div className="container">
              <div className="row mt-2">
                <div className="col-sm-12">
                  <form noValidate>
                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="open"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.open}
                        />
                        Open question
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="multiRadio"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.radio}
                        />
                        Multiple choice (only one choice)
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="multiCheck"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.check}
                        />
                        Multiple choice (more than one choice)
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="slider"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.slider}
                        />
                        Slider
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="trueFalse"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.trueFalse}
                        />
                        True/False
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="incrementDecrement"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.incrementDecrement}
                        />
                        increment/decrement
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="insertTime"
                          onChange={setRadioOptionValue}
                          className="form-check-input"
                          defaultChecked={question.question.insertTime}
                        />
                        insert time
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {question.question.radio ? (
              <>
                <Form.Label className="mt-2">
                  <h5>Write possible answers</h5>
                </Form.Label>
                <br />
                <FormLabel
                  name="item"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                >
                  <Form.Control placeholder="Enter answer" />
                </FormLabel>
                <Button
                  className="ml-2 mr-2"
                  variant="light"
                  id="addRemoveButton"
                  onClick={removeAnswer}
                  inline
                >
                  -
                </Button>

                <Button
                  className="ml-2 mr-2"
                  variant="light"
                  id="addRemoveButton"
                  onClick={addAnswer}
                  inline
                >
                  +
                </Button>

                {items.map((item, index) => (
                  <>
                    <Form inline>
                      <Form.Check key={item.id} custom type="radio" />
                      <FormLabel
                        name="item"
                        type="text"
                        value={item.text}
                        onChange={(e) => handleSelectText(e, index)}
                      >
                        <Form.Control defaultValue={item.text} />
                      </FormLabel>

                      <DropdownButton
                        className="ml-2 mr-2 mb-1"
                        variant="secondary"
                        alignRight
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item
                          eventKey={-1}
                          onSelect={(eventKey) => handleSelect(eventKey, index)}
                        >
                          <p className="ml-1 mb-0 pb-0">no emoticon</p>
                        </Dropdown.Item>
                        {icons.map((icon) => (
                          <Dropdown.Item
                            eventKey={icon.value}
                            onSelect={(eventKey) =>
                              handleSelect(eventKey, index)
                            }
                          >
                            <Figure className="m-0 pb-0">
                              <Figure.Image
                                className="m-0 pb-0"
                                width={30}
                                height={30}
                                src={icon.path}
                                value={icon.value}
                              />
                            </Figure>
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>

                      {item.image !== undefined ? (
                        <>
                          {item.image !== -1 ? (
                            <div>
                              <Figure className="m-0">
                                <Figure.Image
                                  width={30}
                                  height={30}
                                  src={icons[item.image].path}
                                  value={item.image}
                                />
                              </Figure>
                            </div>
                          ) : (
                            <p className="ml-1 mb-0 pb-0">no emoticon</p>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </Form>
                  </>
                ))}
              </>
            ) : question.question.check ? (
              <>
                <Form.Label className="mt-2">
                  <h5>Write possible answers</h5>
                </Form.Label>
                <br />
                <FormLabel
                  name="item"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                >
                  <Form.Control placeholder="Enter answer" />
                </FormLabel>
                <Button
                  className="ml-2 mr-2"
                  variant="light"
                  id="addRemoveButton"
                  onClick={removeAnswer}
                  inline
                >
                  -
                </Button>

                <Button
                  className="ml-2 mr-2"
                  variant="light"
                  id="addRemoveButton"
                  onClick={addAnswer}
                  inline
                >
                  +
                </Button>
                {items.map((item, index) => (
                  <>
                    <Form inline>
                      <Form.Check key={item.id} custom type="checkbox" />

                      <FormLabel
                        name="item"
                        type="text"
                        value={itemName}
                        onChange={(e) => handleSelectText(e, index)}
                      >
                        <Form.Control defaultValue={item.text} />
                      </FormLabel>

                      <DropdownButton
                        className="ml-2 mr-2 mb-1"
                        variant="secondary"
                        alignRight
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item
                          eventKey={-1}
                          onSelect={(eventKey) => handleSelect(eventKey, index)}
                        >
                          <p className="ml-1 mb-0 pb-0">no emoticon</p>
                        </Dropdown.Item>
                        {icons.map((icon) => (
                          <Dropdown.Item
                            eventKey={icon.value}
                            onSelect={(eventKey) =>
                              handleSelect(eventKey, index)
                            }
                          >
                            <Figure className="m-0 pb-0">
                              <Figure.Image
                                className="m-0 pb-0"
                                width={30}
                                height={30}
                                src={icon.path}
                                value={icon.value}
                              />
                            </Figure>
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>

                      {item.image !== undefined ? (
                        <>
                          {item.image !== -1 ? (
                            <div>
                              <Figure className="m-0">
                                <Figure.Image
                                  width={30}
                                  height={30}
                                  src={icons[item.image].path}
                                  value={item.image}
                                />
                              </Figure>
                            </div>
                          ) : (
                            <p className="ml-1 mb-0 pb-0">no emoticon</p>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </Form>
                  </>
                ))}
              </>
            ) : radioOption === 'slider' ? (
              <>
                <Form.Label className="mt-2">
                  <h5>Slider</h5>
                </Form.Label>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik104">
                    <Form.Control
                      type="text"
                      placeholder="Lower value"
                      name="state"
                      value={firstOfferedAnswer}
                      onChange={(e) => setFirstOfferedAnswer(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik105">
                    <Form.Control
                      type="text"
                      placeholder="Higher value"
                      name="zip"
                      value={secondOfferedAnswer}
                      onChange={(e) => setSecondOfferedAnswer(e.target.value)}
                    />
                  </Form.Group>
                </Form.Row>
              </>
            ) : radioOption === 'trueFalse' ? (
              <>
                <Form.Label className="mt-2">
                  <h5>Two choices</h5>
                </Form.Label>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik104">
                    <Form.Control
                      type="text"
                      placeholder="First choice"
                      name="state"
                      value={firstOfferedAnswer}
                      onChange={(e) => setFirstOfferedAnswer(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik105">
                    <Form.Control
                      type="text"
                      placeholder="Second choice"
                      name="zip"
                      value={secondOfferedAnswer}
                      onChange={(e) => setSecondOfferedAnswer(e.target.value)}
                    />
                  </Form.Group>
                </Form.Row>
              </>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {radioOption === -1 ? (
              <Button disabled variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditQuestionModal
