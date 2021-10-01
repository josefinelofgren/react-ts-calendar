// import libaries
import React from 'react';
import moment from 'moment';

// import components
import MenuBurger from '../../navigation/navViews/MenuBurger';
import { tasksCompleted, tasksRemaining } from '../../tasks/SortTasks';

interface Props {
    calendarBubble: boolean,
    value: any,
    tasks: any, 
    userID: string | null 
    showCalendarBubble(calendarBubble: boolean): void
}


function CalendarBubble(props: Props){

    const { calendarBubble, showCalendarBubble, value, tasks, userID } = props;

    // get chosen days date
    let thisDaysDate = value.format('YYYYMMDD');

    return ( 
        <div className={calendarBubble ? 'calendar-bubble is-active' : 'calendar-bubble' } >
             <MenuBurger
               className='calendar'
               sidenav={calendarBubble}
               showSidenav={showCalendarBubble}
               /> 
            <div className='calendar-bubble-content'>
                <h4 className='calendar-bubble-date border-bottom-thin'>{moment(thisDaysDate).format('DD MMM YYYY')}</h4>
                <p className='fw-bold calendar-bubble-title'>Färdiga uppgifter för dagen:</p>
                <ul className='calendar-bubble-tasks'>{tasksCompleted(tasks, userID, thisDaysDate)}</ul>
                <br /> 
                <p className='fw-bold calendar-bubble-title'>Kvarstående uppgifter för dagen:</p>
                <ul className='calendar-bubble-tasks'>{tasksRemaining(tasks, userID, thisDaysDate)}</ul>
            </div>
            <div className='calender-bubble-footer'>
            </div>
        </div>    
    )
}

export default CalendarBubble;