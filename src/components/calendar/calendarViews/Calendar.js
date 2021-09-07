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

    const handleClick = (day) => {
        setValue(day)
    }


   useEffect(() => {

    setCalendar(BuildCalendar(value));

            return (
            fetch(`http://sholiday.faboul.se/dagar/v2.1/${value.format('YYYY')}`)
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
   }, [value, query])

   console.log(data);


    return(
            <Container fluid className='calendar-container'>
                <CalendarHeader
                  value={value}
                  setValue={setValue}
                   /> 
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
                                    <div className='date fw-bold'>
                                        {day.format('D').toString()}
                                    </div>

                                    {data.map((thisDay) => {

                                        if(moment(thisDay.datum).isSame(day)){
                                            return(
                                                <>
                                                <div className={`date holiday ${thisDay['röd dag']}`}>{thisDay.helgdag}</div>
                                                </>
                                            )
                                        }

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