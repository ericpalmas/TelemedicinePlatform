import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import { IconContext } from 'react-icons/lib'
import AddQuestionModal from '../modals/AddQuestionModal'
import AddSurveyModal from '../modals/AddSurveyModal'

// import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as VscIcons from 'react-icons/vsc'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSurveyTemplates, saveSurveyId } from '../actions/surveyActions'

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const [subnav, setSubnav] = useState(false)

  const [removeQuestionMode, setRemoveQuestionMode] = useState(false)

  const removeQuestion = () => setRemoveQuestionMode(!removeQuestionMode)

  const showSubnav = () => setSubnav(!subnav)

  const dispatch = useDispatch()

  const surveyTemplateList = useSelector((state) => state.surveyTemplateList)
  const { loading, error, surveys } = surveyTemplateList

  useEffect(() => {
    dispatch(listSurveyTemplates())
  }, [dispatch])

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
                {surveys.map((survey) => (
                  <div id="dropdownLink">
                    {/* <LinkContainer to={'/surveyCreation/' + survey._id}>
                      <Nav.Link> */}
                    <Button onClick={() => dispatch(saveSurveyId(survey._id))}>
                      <IoIcons.IoIosPaper />
                      {survey.name}
                      {/* <span id="sidebarLabel">{survey.name}</span> */}
                    </Button>

                    {/* <IoIcons.IoIosPaper />
                    <span
                      id="sidebarLabel"
                      onClick={() => dispatch(saveSurveyId(survey._id))}
                    >
                      {' '}
                      {survey.name}
                    </span> */}

                    {/* </Nav.Link>
                    </LinkContainer> */}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}

            {/* Normal menu item */}
            <id id="sidebarLink">
              <div>
                <IoIcons.IoIosPaper />
                <AddSurveyModal />
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
