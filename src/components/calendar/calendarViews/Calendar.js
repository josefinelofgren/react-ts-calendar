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

function Calendar({addTask}){

    moment.locale('sv');
    const weekdays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];

    // states
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());

    const handleClick = (day) => {
        setValue(day)
    }

    useEffect(() => {
        setCalendar(BuildCalendar(value));
    }, [value]);

    return(
            <Container fluid className='calendar-container'>
                <CalendarHeader
                  value={value}
                  setValue={setValue}
                   /> 
                <Container fluid>
                <div className='row calendar-weekday border-right-thin border-left-thin border-bottom-thin border-top-thin'>
                    {weekdays.map((weekday) => (
                        <div className='col-sm weekday-day fw-bold'>{weekday}</div>
                    ))}
                </div>
                    {calendar.map((week, index) => (
                        <div className='row calendar-week border-left-bold border-bottom-bold'>
                            {week.map((day, index) => (
                                <div 
                                  id={`${day.format('YYYYMMDD')}`} 
                                  className={`${dayStyles(day, value)} day col-sm calendar-day border-right-bold`}
                                  onClick={() => handleClick(day)}
                                  > 
                                    <div className='date fw-bold'>
                                        {day.format('D').toString()}
                                    </div>
                                    <div>


                                    </div>
                                    <AddTask
                                      day={day}
                                      value={value}
                                      addTask={addTask}/>
                                </div>
                            ))}
                        </div>
                ))} 
                </Container>
            </Container>
    )

}


export default Calendar;