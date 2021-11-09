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

class CSVdownload extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      headers: [],
      data: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    //Change in props
    return {
      headers: props.headers,
      data: props.data,
    }

    return null // No change to state
  }

  render() {
    return (
      <div>
        {/* <Button onClick={createCSV}>Download transactions to csv</Button> */}

        <CSVLink
          data={this.state.data}
          headers={this.state.headers}
          className='hidden'
          target='_blank'
          ref={csvLink}
          asyncOnClick={true}
          filename='AllContent.csv'
        >
          Download responses
        </CSVLink>
      </div>
    )
  }
}

export default CSVdownload
