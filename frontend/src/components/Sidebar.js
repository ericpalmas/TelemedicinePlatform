import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import { IconContext } from 'react-icons/lib'
import AddQuestionModal from '../modals/AddQuestionModal'
import AddSurveyModal from '../modals/AddSurveyModal'

import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as VscIcons from 'react-icons/vsc'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listSurveyTemplates,
  surveyDetails,
  currentSurvey,
} from '../actions/surveyActions'
import AddSurveyTIme from '../modals/AddSurveyTIme'
import DownloadSurveyCSV from '../components/DownloadSurveyCSV'
import { listPatientsSurveyResponses } from '../actions/responsesActions'

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const [subnav, setSubnav] = useState(false)

  const [removeQuestionMode, setRemoveQuestionMode] = useState(false)

  const removeQuestion = () => setRemoveQuestionMode(!removeQuestionMode)

  const showSubnav = () => setSubnav(!subnav)

  const dispatch = useDispatch()

  const surveyTemplateList = useSelector((state) => state.surveyTemplateList)
  const { loading, error, surveys } = surveyTemplateList

  const patientsResponsesList = useSelector(
    (state) => state.patientsResponsesList
  )
  const {
    loading: loadingResponses,
    error: errorResponses,
    responses,
  } = patientsResponsesList

  const curSurv = useSelector((state) => state.currentSurvey)
  const {
    loading: loadingCurrentSurvey,
    error: errorCurrentSurvey,
    survey: currentId,
  } = curSurv

  var surv = localStorage.getItem('surveyId') || 'noIdSaved'

  var data = []

  var headers = [
    { label: 'Survey Name', key: 'surveyName' },
    { label: 'Date', key: 'date' },
    { label: 'Hour', key: 'hour' },
    { label: 'Name', key: 'name' },
    { label: 'Surname', key: 'surname' },
  ]

  useEffect(() => {
    dispatch(listSurveyTemplates())
  }, [dispatch])

  useEffect(() => {
    if (surv !== 'noIdSaved') {
      dispatch(listPatientsSurveyResponses(surv.split('"')[1]))
    }
  }, [dispatch, surv])

  useEffect(() => {
    if (surv !== 'noIdSaved') {
      surv = localStorage.getItem('surveyId') || 'noIdSaved'
    }
  }, [currentId])

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav id='sidebarNav' sidebar={true}>
          <div id='sidebarWrap'>
            <div id='navIcon' to='#'></div>
            <div
              id='sidebarLink'
              onClick={showSubnav}
              style={{ justifyContent: 'space-between' }}
              data-testid='buttonShowSurveys'
            >
              <div>
                <IoIcons.IoIosPaper />
                <span data-testid='surveys' id='sidebarLabel'>
                  {' '}
                  Surveys
                </span>
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
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <>
                    {surveys.map((survey) => (
                      <>
                        {survey.deleted ? (
                          <></>
                        ) : (
                          <>
                            <div id='dropdownLink'>
                              <Nav.Link>
                                <IoIcons.IoIosPaper />
                                <span
                                  id='sidebarLabel'
                                  style={{ color: '#fff' }}
                                  onClick={() =>
                                    dispatch(currentSurvey(survey._id))
                                  }
                                >
                                  {survey.name}
                                </span>
                              </Nav.Link>
                            </div>
                          </>
                        )}
                      </>
                    ))}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
            {/* </>
            )} */}

            {/* Normal menu item */}
            <id id='sidebarLink' data-testid='addSurvey'>
              <div>
                <IoIcons.IoIosPaper />
                <AddSurveyModal />
              </div>
            </id>

            <div id='sidebarLink' data-testid='addQuestion'>
              <IoIcons.IoMdAddCircle id='icon' />

              <AddQuestionModal id='modalLink' />
            </div>

            <div id='sidebarLink' data-testid='addTimeSlot'>
              <BiIcons.BiTime />
              <AddSurveyTIme />
            </div>

            <div id='sidebarLink' data-testid='downloadCSV'>
              <AiIcons.AiOutlineDownload />
              <DownloadSurveyCSV
                data={data}
                headers={headers}
                responses={responses}
              />
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
