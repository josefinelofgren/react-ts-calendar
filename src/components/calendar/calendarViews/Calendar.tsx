// import libaries
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/sv'

// import components
import Container from 'react-bootstrap/Container';
import BuildCalendar from '../calendarControllers/BuildCalendar';
import dayStyles from '../calendarControllers/DayStyles';
import CalendarHeader from './CalendarHeader';
import AddTask from '../../tasks/AddTask';
import ReturnTask from '../../tasks/ReturnTask';
import { IoIosMore } from 'react-icons/io';
import CalendarBubble from './CalendarBubble';
import axios from 'axios';

interface Props {
    tasks: any,
    userID: string | null, 
    addTask(taskName: string, taskDate: string, taskShortDate: string, taskChecked: boolean): void
}

function Calendar(props: Props){

    const { addTask, tasks, userID } = props;

    moment.locale('sv');
    const weekdays = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];

    // states
    const [calendar, setCalendar] = useState<any>([]);
    const [value, setValue] = useState<any>(moment());
    const [data, setData] = useState([]);
    const [calendarBubble, setCalendarBubble] = useState(false);

    let howMany = [];

    // show calendar bubble for specifik day 
    const showCalendarBubble = (e:any) => {
        setCalendarBubble(!calendarBubble);
    }

   useEffect(() => {
       
    setCalendar(BuildCalendar(value));
    async function fetchData(){
        const result = await axios(`https://sholiday.faboul.se/dagar/v2.1/${value.format('YYYY')}`);
        setData(result.data.dagar);
    }
    fetchData();
   
   }, [value]);

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
                    {calendar.map((week:any, i:number) => (
                        <div key={i} className='row calendar-week border-left-bold border-bottom-bold'>
                            {week.map((day:any) => {
                                return ( 
                                <div
                                  key={`${day.format('YYYY/MM/DD')}`} 
                                  id={`${day.format('YYYY/MM/DD')}`} 
                                  className={`${dayStyles(day, value)} day col-sm calendar-day border-right-bold`}
                                  onClick={(e) => setValue(day)}> 
                                    <div className='calendar-menu '>
                                        <IoIosMore onClick={(e) => showCalendarBubble(e)}/>
                                    </div>
                                    <div className='date inline-block fw-bold'>
                                        {day.format('D').toString()}
                                    </div>
                                    {data.map((thisDay:any) => {
                                        if(moment(thisDay.datum).isSame(day)){
                                            return(<div key={day} className={`date holiday ${thisDay['röd dag']}`}>{thisDay.helgdag}</div>)
                                        } else return null;
                                    })}
                                    <div className='calendar-tasks'>
                                    {tasks && (
                                     tasks.map((task:any) => {
                                         if(moment(task.taskDate).isSame(day)){

                                            howMany.push(task);
                                             return (
                                             <ReturnTask 
                                                key={task.taskID}
                                                userID={userID}
                                                taskChecked={task.taskChecked}
                                                taskName={task.taskName}
                                                taskID={task.taskID}
                                                taskShortDate={task.taskShortDate}/>
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