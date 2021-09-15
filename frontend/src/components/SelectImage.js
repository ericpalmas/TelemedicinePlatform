import React, { useState, Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

class SelectImage extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }
  render() {
    const { selectedOption } = this.state

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}

export default SelectImage
