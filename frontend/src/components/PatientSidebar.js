import React, { useState } from 'react'
import { IconContext } from 'react-icons/lib'
import AddSensorModal from '../modals/AddSensorModal'

// import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
// import * as VscIcons from 'react-icons/vsc'
import * as TiIcons from 'react-icons/ti'

import { Form } from 'react-bootstrap'

const PatientSidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const [subnav, setSubnav] = useState(false)

  const [removeQuestionMode, setRemoveQuestionMode] = useState(false)

  const removeQuestion = () => setRemoveQuestionMode(!removeQuestionMode)

  const showSubnav = () => setSubnav(!subnav)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav id="sidebarNav" sidebar={true}>
          <div id="sidebarWrap">
            <div id="navIcon" to="#"></div>
            {/* if a menu item have a sub menu */}
            <div
              id="sidebarLink"
              onClick={showSubnav}
              style={{ justifyContent: 'space-between' }}
            >
              <div>
                <TiIcons.TiFlowSwitch />
                <span id="sidebarLabel"> Sensors</span>
              </div>
              <div>
                {subnav ? (
                  <RiIcons.RiArrowUpSFill />
                ) : !subnav ? (
                  <RiIcons.RiArrowDownSFill />
                ) : null}
              </div>
            </div>

            {subnav ? (
              <>
                <div id="dropdownLink">
                  <TiIcons.TiFlowSwitch />
                  <span id="sidebarLabel"> Sensor 1</span>

                  <Form>
                    <Form.Check
                      className="ml-3"
                      type="switch"
                      id="custom-switch1"
                    />
                  </Form>
                </div>
                <div id="dropdownLink">
                  <TiIcons.TiFlowSwitch />
                  <span id="sidebarLabel"> Sensor 2</span>
                  <Form>
                    <Form.Check
                      className="ml-3"
                      type="switch"
                      id="custom-switch2"
                    />
                  </Form>
                </div>
                <div id="dropdownLink">
                  <TiIcons.TiFlowSwitch />
                  <span id="sidebarLabel"> Sensor 3</span>
                  <Form>
                    <Form.Check
                      className="ml-3"
                      type="switch"
                      id="custom-switch3"
                    />
                  </Form>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Normal menu item */}
            <id id="sidebarLink">
              <div>
                <IoIcons.IoIosPaper />
                <AddSensorModal />
              </div>
            </id>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default PatientSidebar
