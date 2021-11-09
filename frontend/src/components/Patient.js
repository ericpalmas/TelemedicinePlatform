import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EditPatientModal from '../modals/EditPatientModal'
import Message from '../components/Message'
import Loader from '../components/Loader'

// delete and update the page
import {
  listPatients,
  deletePatient,
  listPatientsAndDisease,
  listPatientsAndDiseases,
} from '../actions/patientActions'

import { listDoctorPatients } from '../actions/doctorActions'

const Patient = ({ patient }) => {
  const dispatch = useDispatch()

  var userInfo = localStorage.getItem('userInfo') || 'noUserInfoSaved'

  const patientDelete = useSelector((state) => state.patientDelete)
  const { loading, error, success } = patientDelete

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatient(id)).then(() => {
        dispatch(listPatients())
        dispatch(listPatientsAndDisease())
      })
    }
  }

  // useEffect(() => {
  //
  // }, [dispatch])

  return (
    <Card
      className='my-3 p-3 rounded'
      style={{ width: '60rem', height: '5rem' }}
    >
      <a>
        <a href={`/patients/${patient._id}`}>
          <Card.Title as='div' className='mr-1' style={{ float: 'left' }}>
            <strong data-testid='patientName'>{patient.name}</strong>
          </Card.Title>

          <Card.Title as='div' className='mr-5' style={{ float: 'left' }}>
            <strong data-testid='patientSurname'>{patient.surname}</strong>
          </Card.Title>
        </a>

        <Button
          data-testid='deleteButton'
          variant='danger'
          style={{ float: 'right' }}
          onClick={() => deleteHandler(patient._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
        <EditPatientModal data-testid='editButton' patient={patient} />
      </a>
    </Card>
  )
}

export default Patient
