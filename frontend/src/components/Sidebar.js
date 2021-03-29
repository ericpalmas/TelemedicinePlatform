import React, { useState } from 'react'
import { IconContext } from 'react-icons/lib'
import AddQuestionModal from '../modals/AddQuestionModal'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as VscIcons from 'react-icons/vsc'
import { Button } from 'react-bootstrap'

const Sidebar = () => {
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
                <IoIcons.IoIosPaper />
                <span id="sidebarLabel"> Surveys</span>
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
                  <IoIcons.IoIosPaper />
                  <span id="sidebarLabel"> Parkinson</span>
                </div>
                <div id="dropdownLink">
                  <IoIcons.IoIosPaper />
                  <span id="sidebarLabel"> Sleep disorders</span>
                </div>
                <div id="dropdownLink">
                  <IoIcons.IoIosPaper />
                  <span id="sidebarLabel"> Obesity</span>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Normal menu item */}
            <id id="sidebarLink">
              <div>
                <IoIcons.IoIosPaper />
                <span id="sidebarLabel"> New survey</span>
              </div>
            </id>

            <div id="sidebarLink">
              <IoIcons.IoMdAddCircle />
              <AddQuestionModal />
            </div>

            {/* Normal menu item */}
            <id id="sidebarLink">
              <div>
                <VscIcons.VscPreview />
                <span id="sidebarLabel"> Preview</span>
              </div>
            </id>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
