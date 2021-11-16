import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

//import { listPatients, deletePatient } from '../actions/patientActions'
import { listDiseases, deleteDisease } from '../actions/diseaseActions'

const AdminDiseaseListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const diseaseList = useSelector((state) => state.diseaseList)
  const {
    loading: loadingDiseaseList,
    error: errorDiseaseList,
    diseases,
  } = diseaseList

  const diseaseDelete = useSelector((state) => state.diseaseDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = diseaseDelete

  const userLogin = useSelector((state) => state.doctorLogin)
  const { userInfo } = userLogin

  // success delete va passato come dipendeza cosi quando cambia viene rieffettuato lo use effect
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDiseases())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDisease(id))
    }
  }

  return (
    <>
      {loadingDiseaseList ? (
        <Loader />
      ) : errorDiseaseList ? (
        <Message variant='danger'>{errorDiseaseList}</Message>
      ) : (
        <>
          <Row>
            <Col className='mb-2 mt-4 ml-0 pl-0'>
              <h1>Diseases</h1>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Table striped bordered hover responsive className='table-lg'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {diseases.map((disease) => (
                  <tr key={disease._id}>
                    <td>{disease._id}</td>
                    <td>
                      {disease.name} {disease.surname}
                    </td>
                    <td>{disease.description}</td>
                    <td>
                      <LinkContainer
                        // to={`/admin/disease/${disease._id}/edit`}
                        // params={{ testvalue: 'hello' }}

                        to={{
                          pathname: `/admin/disease/${disease._id}/edit`,
                          state: { prova: 'ciao' },
                        }}
                      >
                        <Button
                          variant='light'
                          className='btn-sm'
                          //disease={disease}
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(disease._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </>
  )
}

export default AdminDiseaseListScreen
