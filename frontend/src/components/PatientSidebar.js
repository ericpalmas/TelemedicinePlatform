import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IconContext } from 'react-icons/lib'
import AddSensorModal from '../modals/AddSensorModal'

// import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
// import * as VscIcons from 'react-icons/vsc'

import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as TiIcons from 'react-icons/ti'

import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Accordion,
  Card,
} from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listSensors,
  enableSensor,
  listEnabledSensors,
} from '../actions/sensorActions'

const PatientSidebar = ({ match }) => {
  const [sidebar, setSidebar] = useState(false)
  const [subnav, setSubnav] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [removeQuestionMode, setRemoveQuestionMode] = useState(false)
  const removeQuestion = () => setRemoveQuestionMode(!removeQuestionMode)
  const showSubnav = () => setSubnav(!subnav)
  const dispatch = useDispatch()

  const sensorList = useSelector((state) => state.sensorList)
  const { loading, error, sensors } = sensorList

  const sensorEnabled = useSelector((state) => state.sensorEnable)
  const {
    loading: loadingSensorEnabled,
    success: successSensorEnabled,
    error: errorSensorEnabled,
  } = sensorEnabled

  const enabledSensorList = useSelector((state) => state.enabledSensorList)
  const {
    loading: loadingEnabledSensors,
    error: errorEnabledSensors,
    sensorsEnabled,
  } = enabledSensorList

  const [sensorState, setSensorState] = useState([])

  useEffect(() => {
    dispatch(listEnabledSensors(match.params.id))
  }, [dispatch, match, successSensorEnabled])

  useEffect(() => {
    dispatch(listSensors())
  }, [dispatch])

  useEffect(() => {
    setSensorState([])
    if (sensors.length > 0 && sensorsEnabled.length > 0) {
      sensors.forEach((sensor) => {
        if (sensorsEnabled.find((x) => x._id === sensor._id)) {
          setSensorState((state) => [...state, true])
        } else {
          setSensorState((state) => [...state, false])
        }
      })
    }
  }, [sensors, sensorsEnabled, sensorState.length])

  const sensorEnable = (index, event) => {
    event.preventDefault()

    if (window.confirm('Are you sure')) {
      const values = [...sensorState]
      values[index] = !values[index]
      setSensorState(values)

      const newSensor = {
        sensorId: sensors[index],
        patientId: match.params.id,
      }
      dispatch(enableSensor(newSensor))
    }
  }

  return (
    <>
      <nav id="sidebarNav" sidebar={true} className=" pt-3 ">
        <Accordion
          className="mt-3 mb-4 pt-4 "
          style={{ overflow: 'hidden', position: 'relative', width: '100%' }}
        >
          <Card style={{ backgroundColor: '#adb5bd' }}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                style={{ color: '#fff' }}
              >
                <TiIcons.TiFlowSwitch />
                <span id="sidebarLabel"> Sensor</span>
              </Accordion.Toggle>
            </Card.Header>
            <Form>
              {sensors.map((sensor, index) => (
                <Accordion.Collapse eventKey="0" key={sensor._id} value={index}>
                  <Card.Body style={{ color: '#fff' }}>
                    <Row>
                      <TiIcons.TiFlowSwitch />
                      <span id="sidebarLabel"> {sensor.name}</span>
                      <Form.Switch
                        className="ml-3"
                        onChange={(event) => sensorEnable(index, event)}
                        id={'custom-switch' + index}
                        checked={sensorState[index] || false}
                        key={index}
                      />
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              ))}
            </Form>
          </Card>

          <Card style={{ backgroundColor: '#adb5bd' }}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                style={{ color: '#fff' }}
              >
                <IoIcons.IoIosPaper />
                <AddSensorModal />
              </Accordion.Toggle>
            </Card.Header>
          </Card>
        </Accordion>
      </nav>
    </>
  )
}

export default PatientSidebar
