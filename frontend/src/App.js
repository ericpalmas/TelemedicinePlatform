import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PatientListScreen from './screens/PatientListScreen'
import SurveyCreationScreen from './screens/SurveyCreationScreen'
import LoginScreen from './screens/LoginScreen'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/patients" component={PatientListScreen} />
          <Route path="/surveyCreation" component={SurveyCreationScreen} />
          <Route path="/surveyCreation" component={Sidebar} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
