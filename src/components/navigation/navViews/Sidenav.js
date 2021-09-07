// import libaries
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/sv'


// import components
import { IoHomeOutline, IoMailOpenOutline } from 'react-icons/io5';
import { IoIosArrowForward, IoIosNotificationsOutline } from 'react-icons/io';
import ReturnTask from '../../calendar/calendarControllers/ReturnTask';
import { Navbar, Container } from 'react-bootstrap';
import toggleDropDown from '../navControllers/ToggleDropDown';
import NavbarBrand from './NavbarBrand';

function Sidenav({ sidenav, tasks, userID, user }){

    const [dropDown, setDropDown] = useState(true);
    
    moment.locale('sv');
    let todaysDate = moment().format('YYYYMMDD');
    let todaysDateDayAndMonth = moment().format('DD MMM');


    let today;
    let beforeToday;
    let afterToday;

    if(tasks !== undefined){

        // sort tasks after date
    let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));

        // get tasks with deadline before todays date
        beforeToday = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isBefore(todaysDate)){
                return (
                    <ReturnTask
                        key={i} 
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}
                        />
                )
            } else return null;
        }); 
    
        // get tasks with deadline on todays date
        today = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isSame(todaysDate)){
                return (
                    <ReturnTask
                        key={i} 
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}
                        />
                )
            } else return null; 
        }); 
    
        // get tasks with deadline after today date
        afterToday = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isAfter(todaysDate)){
                return (
                    <ReturnTask
                        key={i}  
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}
                        />
                )
            } else return null; 
        });
    };

    return (

            <div className={sidenav ? 'sidenav' : 'sidenav is-active'}>
                <Navbar>
                    <Container fluid>
                        <NavbarBrand 
                            user={user}/> 
                    </Container>
                </Navbar>
                <ul className='sidenav-alternatives'>
                    <p className='fw-bold'><IoHomeOutline className='sidenav-icon' /> Hem</p>
                    <p className='fw-bold'><IoMailOpenOutline className='sidenav-icon' /> Inkorg</p>
                </ul>
                <div className='dropdown'>
                    <div className='fw-bold dropdown-category'>
                        <div className='nav-link-dropdown' onClick={e => toggleDropDown(e, tasks, setDropDown, dropDown)}>
                            <IoIosNotificationsOutline className='sidenav-icon' />
                            <p className='inline-block'>Mina uppgifter</p>
                            <IoIosArrowForward className={dropDown ? 'sidenav-icon arrow inline-block rotate' : 'arrow inline-block' }/></div>
                    </div>
                    <ul className={dropDown ? 'dropdown-content hide' : 'dropdown-content'}>
                        <div className="list-group list-group-flush">
                            <div className='sidenav-category previous'>
                                <div className='sidenav-title border-bottom-dark fw-bold'>
                                Förfallna
                                </div>
                                <div className='sidenav-tasks'>{beforeToday}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-dark fw-bold today'>
                                {todaysDateDayAndMonth}{' '}•{' '}Idag
                                </div>
                                <div className='sidenav-tasks'>{today}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-dark fw-bold'>
                                Kommande
                                </div>
                                <div className='sidenav-tasks'>{afterToday}</div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
    )
}

export default Sidenav;