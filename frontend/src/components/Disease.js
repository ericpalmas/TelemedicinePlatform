import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//import { reduxForm } from 'redux-form'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteDisease } from '../actions/diseaseActions'
import { DISEASE_CREATE_RESET } from '../constants/diseaseConstants'

const Disease = ({ disease }) => {
  const dispatch = useDispatch()

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDisease(id))
    }
  }

  return (
    <Card
      className='my-3 p-3 rounded'
      style={{ width: '60rem', height: '5rem' }}
    >
      <a>
        <a href={`/patients/patientsByDisease/${disease._id}`}>
          <Card.Title as='div' className='mr-1' style={{ float: 'left' }}>
            <strong data-testid='diseaseName'>{disease.name}</strong>
          </Card.Title>
        </a>

        <Button
          data-testid='deleteDiseaseButton'
          variant='danger'
          style={{ float: 'right' }}
          onClick={() => deleteHandler(disease._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
        <Button
          data-testid='editDiseaseButton'
          variant='light'
          style={{ float: 'right' }}
        >
          <i className='fas fa-edit'></i>
        </Button>
      </a>
    </Card>
  )
}

export default Disease
