import React from 'react'
import { Card } from 'react-bootstrap'

const Disease = ({ disease }) => {
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ width: '60rem', height: '5rem' }}
    >
      <a href={`/diseases/${disease._id}`}>
        <Card.Title as="div" className="mr-1" style={{ float: 'left' }}>
          <strong>{disease.name}</strong>
        </Card.Title>

        <div class="span6"> </div>
      </a>
    </Card>
  )
}

export default Disease
