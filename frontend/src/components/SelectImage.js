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
    console.log(`Option selected:`, selectedOption)
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

// const SelectImage = () => {
//   const [selectedOption, setOption] = useState(0)

//   const handleChange = (selectedOption) => {
//     setOption(selectedOption)
//     console.log(`Option selected:`, selectedOption)
//   }

//   var imgUrl = process.env.PUBLIC_URL + '../../public/images/normal.png'

//   return (
//     // <Select
//     //   value={selectedOption}
//     //   onChange={(e) => handleChange(e.target.value)}
//     //   options={options}
//     // />
//     <select>
//       <option
//       // style="background-image:url(../../public/images/normal.png)"
//       >
//         {' '}
//         ale{' '}
//       </option>
//       <option>aaaa</option>
//       {/* <option style="background-image:url(male.png);">male</option>
//       <option style="background-image:url(female.png);">female</option>
//       <option style="background-image:url(others.png);">others</option> */}
//     </select>
//   )
// }

// export default SelectImage
