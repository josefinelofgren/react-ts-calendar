// import libaries
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/sv'

// import components
import Container from 'react-bootstrap/Container';
import BuildCalendar from '../calendarControllers/BuildCalendar';
import dayStyles from '../calendarControllers/DayStyles';
import CalendarHeader from './CalendarHeader';
import AddTask from '../calendarControllers/AddTask';
import ReturnTask from '../calendarControllers/ReturnTask';
import { IoIosMore } from 'react-icons/io';
import CalendarBubble from './CalendarBubble';

function Calendar({ addTask, tasks, userID }){

    moment.locale('sv');
    const weekdays = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];

    // states
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const [calendarBubble, setCalendarBubble] = useState(false);


    const handleClick = (day) => {
        setValue(day)
    }

    const showCalendarBubble = (e) => {
        setCalendarBubble(!calendarBubble);
    }

   useEffect(() => {
    setCalendar(BuildCalendar(value));

        return (
           fetch(`https://sholiday.faboul.se/dagar/v2.1/${value.format('YYYY')}`)
           .then(response => {
               if(response.ok) {
                   return response.json()
               }
               throw response;
            })
            .then(data => {
                setLoading(false);
                setData(data.dagar);
            })
            .catch(error => {
                console.error('error', error);
                setError(error)
            })
            )
   }, [value])

   console.log(data);


    return(
            <Container fluid className='calendar-container'>
                <CalendarHeader
                  value={value}
                  setValue={setValue}
                   /> 
                <div className='specifik-day'>
                    <CalendarBubble 
                      userID={userID}
                      tasks={tasks}
                      value={value}
                      calendarBubble={calendarBubble}
                      showCalendarBubble={showCalendarBubble}
                    /> 
                </div>
                <Container fluid>
                <div className='row calendar-weekday border-right-thin border-left-thin border-bottom-thin border-top-thin'>
                    {weekdays.map((weekday, i) => (
                        <div key={i} className='col-sm weekday-day fw-bold'>{weekday}</div>

                    ))}
                </div>
                    {calendar.map((week, i) => (
                        <div key={i} className='row calendar-week border-left-bold border-bottom-bold'>
                            {week.map((day) => {

                                return ( 
                                <div
                                  key={`${day.format('YYYY/MM/DD')}`} 
                                  id={`${day.format('YYYY/MM/DD')}`} 
                                  className={`${dayStyles(day, value)} day col-sm calendar-day border-right-bold`}
                                  onClick={(e) => handleClick(day)}
                                  > 
                                    <div className='calendar-menu '>
                                        <IoIosMore onClick={(e) => showCalendarBubble(e)}/>
                                    </div>
                                    <div className='date inline-block fw-bold'>
                                        {day.format('D').toString()}
                                    </div>

                                    {data.map((thisDay) => {
                                        if(moment(thisDay.datum).isSame(day)){
                                            return(
                                                <>
                                                <div key={day} className={`date holiday ${thisDay['röd dag']}`}>{thisDay.helgdag}</div>
                                                </>
                                            )
                                        } else return;

                                    })}
                                    
                                    <div className='calendar-tasks'>
                                    {tasks && (
                                     tasks.map((task) => {
                                         if(moment(task.taskDate).isSame(day)){
                                             return (
                                             <ReturnTask 
                                                key={task.taskID}
                                                userID={userID}
                                                taskChecked={task.taskChecked}
                                                taskName={task.taskName}
                                                taskID={task.taskID}
                                                taskShortDate={task.taskShortDate}
                                                />
                                            )} else return null;
                                        }) 
                                        )}
                                    </div>
                                    <AddTask
                                      day={day}
                                      value={value}
                                      addTask={addTask}/>
                                </div>
                            )}
                            )}
                        </div>
                ))} 
                </Container>
            </Container>
    )

}


export default Calendar;