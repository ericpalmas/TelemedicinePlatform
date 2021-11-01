import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PatientListScreen from './screens/PatientListScreen'
import SurveyCreationScreen from './screens/SurveyCreationScreen'
import LoginScreen from './screens/LoginScreen'
import DiseaseListScreen from './screens/DiseaseListScreen'
import PatientScreen from './screens/PatientScreen'
import PatientsByDisease from './screens/PatientsByDisease'
import Sidebar from './components/Sidebar'
import PatientSidebar from './components/PatientSidebar'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import DoctorEditScreen from './screens/DoctorEditScreen'
import AddDoctorScreen from './screens/AddDoctorScreen'

import AdminDoctorListScreen from './screens/AdminDoctorListScreen'
import AdminPatientListScreen from './screens/AdminPatientListScreen'
import AdminDiseaseListScreen from './screens/AdminDiseaseListScreen'
import AdminSurveyListScreen from './screens/AdminSurveyListScreen'
import StudyListScreen from './screens/StudyListScreen'
import PatientListByStudy from './screens/PatientListByStudy'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/patients' component={PatientListScreen} exact />
          <Route
            path='/patients/patientsByDisease/:id'
            component={PatientsByDisease}
          />
          <Route path='/patients/:id' component={PatientScreen} exact />
          <Route path='/diseases' component={DiseaseListScreen} exact />
          <Route path='/studies' component={StudyListScreen} exact />
          <Route path='/surveyCreation' component={SurveyCreationScreen} />
          <Route path='/surveyCreation' component={Sidebar} />
          <Route path='/patients/:id' component={PatientSidebar} exact />
          <Route
            path='/patients/patientsByStudy/:id'
            component={PatientListByStudy}
            exact
          />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/doctorlist' component={AdminDoctorListScreen} />
          <Route path='/admin/doctor/:id/edit' component={DoctorEditScreen} />
          <Route path='/admin/addDoctor' component={AddDoctorScreen} />
          <Route path='/admin/patientList' component={AdminPatientListScreen} />
          <Route path='/admin/diseaseList' component={AdminDiseaseListScreen} />
          <Route path='/admin/surveyList' component={AdminSurveyListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
