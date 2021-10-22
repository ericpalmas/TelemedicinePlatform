import React, { Component } from 'react'
import { CSVLink, CSVDownload } from 'react-csv'

export default class DownloadSurveyCSV extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      headers: [],
      data: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.responses) {
      if (props.responses.lenght !== 0) {
        if (props.responses[0] !== undefined) {
          props.responses[0].surveyResponses.forEach((response, index) => {
            // setto gli header
            if (response.question[0]) {
              props.headers.push({
                label: response.question[0].text,
                key: 'Question ' + (index + 1),
              })
            } else {
              props.headers.push({
                label: 'Question ' + (index + 1),
                key: 'Question ' + (index + 1),
              })
            }
          })

          props.responses.forEach((response, i) => {
            var cur = {}
            response.surveyResponses.forEach((singleResponse, index) => {
              cur = {
                surveyName: response.survey[0] ? response.survey[0].name : '',
                name: singleResponse.patient[0]
                  ? singleResponse.patient[0].name
                  : '',
                surname: singleResponse.patient[0]
                  ? singleResponse.patient[0].surname
                  : '',
                date: singleResponse.surveyResponse[0]
                  ? singleResponse.surveyResponse[0].updatedAt.substring(0, 10)
                  : '',
                hour: singleResponse.surveyResponse[0]
                  ? singleResponse.surveyResponse[0].updatedAt.substring(12, 16)
                  : '',
              }
            })

            response.surveyResponses.forEach((singleResponse, index) => {
              if (singleResponse.answer.type === 'Check') {
                if (singleResponse.answer.answers !== undefined) {
                  var string = ''
                  singleResponse.answer.answers.forEach(function (element) {
                    string += element.answer + ' '
                  })

                  if (
                    props.headers.find(
                      (elem) => elem.key === 'Question ' + (index + 1)
                    )
                  )
                    cur['Question ' + (index + 1)] = string
                }
              } else {
                if (
                  props.headers.find(
                    (elem) => elem.key === 'Question ' + (index + 1)
                  )
                )
                  cur['Question ' + (index + 1)] = singleResponse.answer.answer
              }
            })

            props.data.push(cur)
          })
        }
      }

      //Change in props
      return {
        headers: props.headers,
        data: props.data,
      }
    }
    return null // No change to state
  }

  render() {
    return (
      <CSVLink
        data={this.state.data}
        headers={this.state.headers}
        asyncOnClick={true}
        filename='AllContent.csv'
        style={{ color: '#e1e9fc', paddingLeft: '1rem' }}
      >
        Download patients
      </CSVLink>
    )
  }
}
