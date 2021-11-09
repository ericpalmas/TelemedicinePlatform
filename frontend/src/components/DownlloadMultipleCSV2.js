import React, { Component, useState, useEffect, useCallback } from 'react'
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

export default class DownlloadMultipleCSV2 extends Component {
  constructor(props) {
    super(props)
    this.csvLink = React.createRef()
    this.state = {
      currentHeader: [],
      currentData: [],
      headers: [],
      data: [],
      fileName: 'defaultName.csv',
    }
  }

  createCSV = async () => {
    for (var i = 0; i < this.state.headers.length; i++) {
      const res = await this.setState((previousState) => {
        return {
          currentHeaders: this.state.headers[i],
          currentData: this.state.data[i],
          fileName: this.state.data[i][0].surveyName + '.csv',
        }
      })

      this.csvLink.current.link.click()
    }
  }

  static getDerivedStateFromProps(props, state) {
    var allHeaders = []
    var allData = []
    const responses = props.responses

    for (const survey of responses) {
      var currentDatas = []
      var currentHeaders = [
        { label: 'Survey Name', key: 'surveyName' },
        { label: 'Date', key: 'date' },
        { label: 'Hour', key: 'hour' },
        { label: 'Name', key: 'name' },
        { label: 'Surname', key: 'surname' },
      ]

      //names.push(survey.survey[0].surveyResponses[0].survey.name + '.csv')
      if (survey.survey[0] !== undefined) {
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

      allHeaders.push(currentHeaders)
      survey.survey.forEach((surveyResponse, surveyResponseIndex) => {
        var cur = {}
        surveyResponse.surveyResponses.forEach(
          (singleResponse, indexResponse) => {
            cur = {
              surveyName: singleResponse.survey
                ? singleResponse.survey.name
                : '',
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

        currentDatas.push(cur)
      })
      allData.push(currentDatas)
    }

    return {
      headers: allHeaders,
      data: allData,
    }

    return null
  }

  render() {
    return (
      <div>
        <Button onClick={this.createCSV}>Download transactions to csv</Button>
        <CSVLink
          data={this.state.currentData}
          headers={this.state.currentHeaders}
          className='hidden'
          target='_blank'
          ref={this.csvLink}
          filename={this.state.fileName}
          asyncOnClick={false}
        />
      </div>
    )
  }
}
