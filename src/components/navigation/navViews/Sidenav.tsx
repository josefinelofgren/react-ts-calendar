// import libaries
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/sv'

// import components
import { IoHomeOutline, IoMailOpenOutline } from 'react-icons/io5';
import { IoIosArrowForward, IoIosNotificationsOutline } from 'react-icons/io';
import { Navbar, Container } from 'react-bootstrap';
import toggleDropDown from '../navControllers/ToggleDropDown';
import NavbarBrand from './NavbarBrand';
import { tasksBeforeToday, tasksToday, tasksAfterToday } from '../../tasks/SortTasks';


interface Props {
    sidenav: boolean,
    tasks: object
    userID: string | null
    user: any
}

interface States {
    dropDown: boolean,
    setDropDown(dropDown: boolean): any

}

function Sidenav(props: Props, states: States){

    const { sidenav, tasks, userID, user } = props;

    // states 
    const [dropDown, setDropDown] = useState(true);

    // dates 
    moment.locale('sv');
    let todaysDateDayAndMonth = moment().format('DD MMM');


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
                        <div className='nav-link-dropdown' onClick={() => toggleDropDown(dropDown, tasks, setDropDown)}>
                            <IoIosNotificationsOutline className='sidenav-icon' />
                            <p className='inline-block'>Mina uppgifter</p>
                            <IoIosArrowForward className={dropDown ? 'sidenav-icon arrow inline-block rotate' : 'arrow inline-block' }/></div>
                    </div>
                    <ul className={dropDown ? 'dropdown-content hide' : 'dropdown-content'}>
                        <div className="list-group list-group-flush">
                            <div className='sidenav-category previous'>
                                <div className='sidenav-title border-bottom-thin fw-bold'>
                                Förfallna
                                </div>
                                <div className='sidenav-tasks'>{tasksBeforeToday(tasks, userID)}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-thin border-color fw-bold today'>
                                {todaysDateDayAndMonth}{' '}•{' '}Idag
                                </div>
                                <div className='sidenav-tasks'>{tasksToday(tasks, userID)}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-thin fw-bold'>
                                Kommande
                                </div>
                                <div className='sidenav-tasks'>{tasksAfterToday(tasks, userID)}</div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
    )
}

export default Sidenav;