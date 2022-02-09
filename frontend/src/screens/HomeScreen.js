import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <>
      <Row className='justify-content-md-center'>
        {/* Link is better of href because we don't need to load a page, is a single page application */}

        <Col xs lg='3'>
          <Card className='my-3 p-3 rounded'>
            <Link to={`/diseases`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/disease1.png'}
                variant='top'
              />
            </Link>
            <Card.Body>
              <Link to={`/diseases`}>
                <Card.Title as='div'>
                  <strong>Manage diseases</strong>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Link is better of href because we don't need to load a page, is a single page application */}

        <Col xs lg='3'>
          <Card className='my-3 p-3 rounded'>
            <Link to={`/patients`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/Monitor.png'}
                variant='top'
              />
            </Link>
            <Card.Body>
              <Link to={`/patients`}>
                <Card.Title as='div'>
                  <strong>Manage patients</strong>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col xs lg='3'>
          <Card className='my-3 p-3 rounded'>
            <Link to={`/studies`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/study2.png'}
                variant='top'
              />
            </Link>
            <Card.Body className='mt-2 '>
              <Link to={`/studies`}>
                <Card.Title as='div'>
                  <strong>Manage studies</strong>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col xs lg='3'>
          <Card className='my-3 p-3 rounded'>
            <Link to={`/surveyCreation`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/Survey.png'}
                variant='top'
              />
            </Link>
            <Card.Body>
              <Link to={`/surveyCreation`}>
                <Card.Title as='div'>
                  <strong>Manage surveys</strong>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
