import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Accordion,
  Card,
} from 'react-bootstrap'
import { CSVLink, CSVDownload } from 'react-csv'

const DownloadMultipleCSV = ({ data, headers, responses }) => {
  const [fileName, setFileName] = useState('defaultName.csv')
  const [isCsvFileReady, setIsCsvFileReady] = useState(false)
  const [firstIteration, setFirstIteration] = useState(false)

  var currentHeaders = headers
  var currentData = data

  const csvLink = React.createRef()

  useEffect(() => {
    if (
      firstIteration &&
      isCsvFileReady &&
      csvLink.current &&
      csvLink.current.link
    ) {
      setTimeout(() => {
        console.log(csvLink)
        //csvLink.current.link.click()
        setIsCsvFileReady(false)
      })
    }
  }, [isCsvFileReady])

  async function elaborateData(survey) {
    currentHeaders = headers
    currentData = []

    setFirstIteration(true)

    if (survey.survey[0] !== undefined) {
      setFileName(survey.survey[0].surveyResponses[0].survey.name + '.csv')
      survey.survey[0].surveyResponses.forEach((response, index) => {
        if (response.question) {
          currentHeaders.push({
            label: response.question.text,
            key: 'Question ' + (index + 1),
          })
        } else {
          currentHeaders.push({
            label: 'Question ' + (index + 1),
            key: 'Question ' + (index + 1),
          })
        }
      })
    }

    survey.survey.forEach((surveyResponse, surveyResponseIndex) => {
      var cur = {}
      surveyResponse.surveyResponses.forEach(
        (singleResponse, indexResponse) => {
          cur = {
            surveyName: singleResponse.survey ? singleResponse.survey.name : '',
            name: singleResponse.patient ? singleResponse.patient.name : '',
            surname: singleResponse.patient
              ? singleResponse.patient.surname
              : '',
            date: singleResponse.surveyResponse
              ? singleResponse.surveyResponse.updatedAt.substring(0, 10)
              : '',
            hour: singleResponse.surveyResponse
              ? singleResponse.surveyResponse.updatedAt.substring(12, 16)
              : '',
          }
        }
      )

      surveyResponse.surveyResponses.forEach((singleResponse, index) => {
        if (singleResponse.answer.type === 'Check') {
          if (singleResponse.answer.answers !== undefined) {
            var string = ''
            singleResponse.answer.answers.forEach(function (element) {
              string += element.answer + ' '
            })

            if (
              currentHeaders.find(
                (elem) => elem.key === 'Question ' + (index + 1)
              )
            )
              cur['Question ' + (index + 1)] = string
          }
        } else {
          if (
            currentHeaders.find(
              (elem) => elem.key === 'Question ' + (index + 1)
            )
          )
            cur['Question ' + (index + 1)] = singleResponse.answer.answer
        }
      })

      currentData.push(cur)
    })

    return true
  }

  // async function printCSV() {
  //   if (isCsvFileReady) {
  //     setIsCsvFileReady(false)
  //     csvLink.current.link.click()
  //     return true
  //   } else {
  //     console.log('Non è pronto')
  //     return false
  //   }
  // }

  async function createCSV(e) {
    e.preventDefault()
    // for (const survey of responses) {
    //   try {
    //     const res = await elaborateData(survey)
    //     console.log(res)
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     csvLink.current.link.click()
    //   }
    // }

    for (const survey of responses) {
      try {
        const res = await elaborateData(survey)
        if (res) {
          setIsCsvFileReady(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Button onClick={createCSV}>Download transactions to csv</Button>
      <CSVLink
        data={currentData}
        headers={currentHeaders}
        className='hidden'
        target='_blank'
        ref={csvLink}
        filename={fileName}
        asyncOnClick={false}
      />
    </div>
  )
}

export default DownloadMultipleCSV
