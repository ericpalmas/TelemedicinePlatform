import React from 'react'
import { Card } from 'react-bootstrap'

const Patient = ({patient}) => {
    return (
        <Card className='my-3 p-3 rounded' style={{  width: '60rem', height: '5rem'}} >
            <a href={`/patient/${patient._id}`}>
              <Card.Title as='div'className='mr-1' style={{  float: 'left'}}>
                  <strong>{patient.name}</strong>
              </Card.Title>  

              <Card.Title as='div' className='mr-5' style={{  float: 'left'}}>
                  <strong>{patient.surname}</strong>
              </Card.Title> 
            
              <div class="span6"> </div>

            <Card.Text as='div' className='mr-10'>
                {patient.pathology}
            </Card.Text>  

            </a>
        </Card>




    )
}

export default Patient
