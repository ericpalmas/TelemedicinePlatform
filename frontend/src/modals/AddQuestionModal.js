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
import { createQuestion } from '../actions/questionActions'
import { surveyDetails } from '../actions/surveyActions'
import Dropdown from 'react-bootstrap/Dropdown'

const AddQuestionModal = () => {
  var surv = localStorage.getItem('surveyId')

  // Open and close modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // array of possible answers
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')
  const [text, setText] = useState('')
  const [radio, setRadio] = useState(false)
  const [check, setCheck] = useState(false)
  const [open, setOpen] = useState(false)
  const [slider, setSlider] = useState(false)
  const [trueFalse, setTrueFalse] = useState(false)
  const [incrementDecrement, setIncrementDecrement] = useState(false)
  const [insertTime, setInsertTime] = useState(false)

  // type of question selected
  const [radioOption, setRadioOption] = useState('')

  const icons = [
    { path: process.env.PUBLIC_URL + '/images/verySmiley.png', value: 0 },
    { path: process.env.PUBLIC_URL + '/images/smiley.png', value: 1 },
    { path: process.env.PUBLIC_URL + '/images/normal.png', value: 2 },
    { path: process.env.PUBLIC_URL + '/images/sad.png', value: 3 },
    { path: process.env.PUBLIC_URL + '/images/verySad.png', value: 4 },
  ]

  // const [selectedPath, setSelectedPath] = useState('')
  const [selectedValue, setSelectedValue] = useState(-1)

  // const [imageItems, setImageItems] = useState([])

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

  const addAnswer = () => {
    if (itemName !== '') {
      setItems([
        ...items,
        {
          id: items.length,
          text: itemName,
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
    e.preventDefault()
    const newQuestion = {
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
    dispatch(createQuestion(newQuestion)).then(() => {
      dispatch(surveyDetails(surv.split('"')[1]))
    })
  }

  const handleSelect = (e, index) => {
    console.log('emoticon index: ' + e)
    console.log('item index: ' + index)

    switch (e) {
      case '-1':
        var values = [...items]
        values[index].image = -1
        setItems(values)
        break
      case '0':
        var values = [...items]
        values[index].image = 0
        setItems(values)
        break
      case '1':
        var values = [...items]
        values[index].image = 1
        setItems(values)
        break
      case '2':
        var values = [...items]
        values[index].image = 2
        setItems(values)
        break
      case '3':
        var values = [...items]
        values[index].image = 3
        setItems(values)
        break
      case '4':
        var values = [...items]
        values[index].image = 4
        setItems(values)
        break
      default:
    }
  }
  useEffect(() => {
    if (successCreate) {
      dispatch(surveyDetails(surv.split('"')[1]))
    }
  }, [dispatch, successCreate])

  return (
    <>
      <FormLabel variant="secondary" onClick={handleShow} className="ml-3">
        Add question
      </FormLabel>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Question creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-2">
            <h5>Question text</h5>
          </Form.Label>
          <Form.Control
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Form.Label className="mt-4">
            <h5>Question type</h5>
          </Form.Label>

          <div className="container">
            <div className="row mt-2">
              <div className="col-sm-12">
                <form>
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name="react-tips"
                        value="open"
                        onChange={setRadioOptionValue}
                        className="form-check-input"
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
                      />
                      insert time
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {radioOption === 'multiRadio' ? (
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

              {items.map((item) => (
                <Form.Check
                  className="ml-3 mr-2"
                  key={item.id}
                  custom
                  label={item.text}
                  type="radio"
                />
              ))}
            </>
          ) : radioOption === 'multiCheck' ? (
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
                <Form inline>
                  <Form.Check
                    key={item.id}
                    label={item.text}
                    custom
                    type="checkbox"
                  />

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
                      no emoticon
                    </Dropdown.Item>
                    {icons.map((icon) => (
                      <Dropdown.Item
                        eventKey={icon.value}
                        onSelect={(eventKey) => handleSelect(eventKey, index)}
                      >
                        <Figure>
                          <Figure.Image
                            width={20}
                            height={20}
                            src={icon.path}
                            value={icon.value}
                          />
                        </Figure>
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

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
                    <p>no emoticon</p>
                  )}
                </Form>
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
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationFormik105">
                  <Form.Control
                    type="text"
                    placeholder="Higher value"
                    name="zip"
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
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationFormik105">
                  <Form.Control
                    type="text"
                    placeholder="Second choice"
                    name="zip"
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
            <Form onSubmit={submitHandler}>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddQuestionModal
