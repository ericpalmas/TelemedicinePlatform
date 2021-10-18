import React, { Component } from 'react'
import { CSVLink, CSVDownload } from 'react-csv'

export default class DownloadPatientsCSV extends Component {
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
        Download patients
      </CSVLink>
    )
  }
}
