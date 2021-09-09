// import libaries
import React from 'react';
import moment from 'moment';

// import components
import MenuBurger from '../../navigation/navViews/MenuBurger';
import { tasksCompleted, tasksRemaining } from '../../tasks/SortTasks';


function CalendarBubble({ calendarBubble, showCalendarBubble, value, tasks, userID }){

    // get chosen days date
    let thisDaysDate = value.format('YYYYMMDD');

    return ( 
        <div className={calendarBubble ? 'calendar-bubble is-active' : 'calendar-bubble' } >
             <MenuBurger
               className="calendar"
               state={calendarBubble}
               showState={showCalendarBubble}
               /> 
            <div className='calendar-bubble-content'>
                <h4 className='calendar-bubble-date border-bottom-thin'>{new moment(thisDaysDate).format('DD MMM YYYY')}</h4>
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