import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Card className="my-3 p-3 rounded">
            {/* Link is better of href because we don't need to load a page, is a single page application */}
            <Link to={`/surveyCreation`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/Survey.png'}
                variant="top"
              />
            </Link>
            <Card.Body>
              <Link to={`/surveyCreation`}>
                <Card.Title as="div">
                  <strong>Manage surveys</strong>
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col xs lg="2">
          <Card className="my-3 p-3 rounded">
            {/* Link is better of href because we don't need to load a page, is a single page application */}
            <Link to={`/patients`}>
              <Card.Img
                src={process.env.PUBLIC_URL + '/images/Monitor.png'}
                variant="top"
              />
            </Link>
            <Card.Body>
              <Link to={`/patients`}>
                <Card.Title as="div">
                  <strong>Manage patients</strong>
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
