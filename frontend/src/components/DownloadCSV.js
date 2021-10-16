import React, { Component } from 'react'
import { CSVLink, CSVDownload } from 'react-csv'

export default class downloadCSV extends Component {
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

          // setto i dati
          props.responses.forEach((response, i) => {
            var cur = {
              surveyName: response.survey[0].name,
              name: props.patient.name,
              surname: props.patient.surname,
            }

            response.surveyResponses.forEach((singleResponse, index) => {
              cur['date'] =
                singleResponse.question[0] !== undefined
                  ? singleResponse.question[0].updatedAt.substring(0, 10)
                  : response.survey[0].createdAt.substring(0, 10)
              cur['hour'] =
                singleResponse.question[0] !== undefined
                  ? singleResponse.question[0].updatedAt.substring(12, 16)
                  : response.survey[0].createdAt.substring(12, 16)

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
      >
        Download
      </CSVLink>
    )
  }
}
