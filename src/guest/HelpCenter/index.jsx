import React, { useState} from 'react';
import {
  Accordion,
  Card,
  Button,
} from 'react-bootstrap';
import Questions from "./questions"

const HelpCenter = () => {


  return (
    <div className="container pt-5">  <div className="App container">
      <h2>FAQ</h2>
      <hr/>
      <Accordion>
        {Object.keys(Questions).map(index => (
          <Card key={ index}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={index} className="text-violet">
                {  Questions[index].question}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
              <Card.Body>{ Questions[index].answer}</Card.Body>
          </Accordion.Collapse>
        </Card>
        )) }    
</Accordion>
        </div>
      </div>
    )
}



export default HelpCenter
