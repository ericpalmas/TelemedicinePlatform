import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EditPatientModal from '../modals/EditPatientModal'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listPatients,
  deletePatient,
  updatePatient,
} from '../actions/patientActions'

const Patient = ({ patient }) => {
  const dispatch = useDispatch()

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatient(id)).then(() => {
        dispatch(listPatients())
      })
    }
  }

  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ width: '60rem', height: '5rem' }}
    >
      <a>
        <a href={`/patients/${patient._id}`}>
          <Card.Title as="div" className="mr-1" style={{ float: 'left' }}>
            <strong>{patient.name}</strong>
          </Card.Title>

          <Card.Title as="div" className="mr-5" style={{ float: 'left' }}>
            <strong>{patient.surname}</strong>
          </Card.Title>
        </a>

        <Button
          variant="danger"
          style={{ float: 'right' }}
          onClick={() => deleteHandler(patient._id)}
        >
          <i className="fas fa-trash"></i>
        </Button>
        <EditPatientModal patient={patient} />
      </a>
    </Card>
  )
}

export default Patient
