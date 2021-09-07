// import libaries
import React from 'react';
import moment from 'moment';

// import components
import MenuBurger from '../../navigation/navViews/MenuBurger';
import ReturnTask from '../calendarControllers/ReturnTask';
import AddTask from '../calendarControllers/AddTask';


function CalendarBubble({ calendarBubble, showCalendarBubble, value, tasks, userID }){
   
    let taskDone;
    let taskRemaining;
    let thisDaysDate = value.format('YYYYMMDD');

    // get current date
    const currentDate = () => {
        return value.format('DD MMM YYYY')
    }

    // check if tasks is not equal to undefined
    if(tasks !== undefined){

        // sort tasks after date
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));

        // get tasks that's done
        taskDone = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isSame(thisDaysDate)){
                if(task.taskChecked === true){
                    return (
                       <div className='calender-bubble-task'>
                           <ReturnTask
                               key={i} 
                               userID={userID}
                               taskChecked={task.taskChecked}
                               taskName={task.taskName}
                               taskID={task.taskID}
                               taskShortDate={task.taskShortDate}
                            />
                        </div>
                    )
                }
            } else return null;
        }); 

        // get tasks that's remaining
        taskRemaining = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isSame(thisDaysDate)){
                if(task.taskChecked === false){
                    return (
                        <div className='calender-bubble-task'>
                            <ReturnTask
                                key={i} 
                                userID={userID}
                                taskChecked={task.taskChecked}
                                taskName={task.taskName}
                                taskID={task.taskID}
                                taskShortDate={task.taskShortDate}
                            />
                        </div>
                    )
                }
            } else return null;
        }); 
    }


    return ( 
        <div className={calendarBubble ? 'calendar-bubble is-active' : 'calendar-bubble' } >
             <MenuBurger
               className="calendar"
               state={calendarBubble}
               showState={showCalendarBubble}
               /> 
            <div className='calendar-bubble-content'>
                <h4 className='calendar-bubble-date border-bottom-thin'>{currentDate()}</h4>
                <p className='fw-bold calendar-bubble-title'>Färdiga uppgifter för dagen:</p>
                <ul className='calendar-bubble-tasks'>{taskDone}</ul>
                <br /> 
                <p className='fw-bold calendar-bubble-title'>Kvarstående uppgifter för dagen:</p>
                <ul className='calendar-bubble-tasks'>{taskRemaining}</ul>
            </div>
            <div className='calender-bubble-footer'>
            </div>
        </div>    
    )
}

export default CalendarBubble;