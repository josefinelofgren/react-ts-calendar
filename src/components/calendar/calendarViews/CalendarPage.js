// import libaries
import React from 'react';

// import components
import { Container, Row, Col } from 'react-bootstrap';
import Calendar from './Calendar';
import Sidenav from '../../navigation/navViews/Sidenav';


function CalendarPage({sidenav, showSidenav, addTask, tasks, userID}){

    console.log(tasks);

    return(
        <Container fluid>
            <Row>
                <Col xs={sidenav? '3' : '0'} className={sidenav ? 'sidenav-wrap is-active border-right' : 'sidenav-wrap not-active'}>
                        <Sidenav 
                          tasks={tasks}
                          userID={userID}/> 
                    </Col>
                <Col>
                <Calendar 
                  addTask={addTask}/> 
                </Col>
            </Row>
        </Container>
    )
}


export default CalendarPage;