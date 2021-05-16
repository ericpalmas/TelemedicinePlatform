import React, { useState, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, FormLabel, Col } from 'react-bootstrap'

const AddQuestionModal = () => {
  // Open and close modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // array of possible answers
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')

  // add a possible answer
  const addAnswer = () => {
    if (itemName !== '') {
      setItems([
        ...items,
        {
          id: items.length,
          name: itemName,
        },
      ])
    }
  }

  //remove possible answer
  const removeAnswer = () => {
    const values = [...items]
    values.splice(values.length - 1, 1)
    setItems(values)
  }

  // type of question selected
  const [radioOption, setRadioOption] = useState('')
  const setRadioOptionValue = (event) => {
    setRadioOption(event.target.value)
    console.log(event.target.checked)
    setItems([])
  }

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
          <Form.Control />

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
                  label={item.name}
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

              {items.map((item) => (
                <Form.Check
                  className="ml-3 mr-2"
                  key={item.id}
                  custom
                  label={item.name}
                  type="checkbox"
                />
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
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddQuestionModal
