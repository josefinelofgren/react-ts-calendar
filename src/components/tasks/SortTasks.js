// import libaries
import React from 'react';
import moment from 'moment';
import 'moment/locale/sv'

// import components
import ReturnTask from './ReturnTask';

// dates 
moment.locale('sv');
let todaysDate = moment().format('YYYYMMDD');



// TASKS BEFORE TODAYS DATE 
export const tasksBeforeToday = (tasks, userID) => {
    if(tasks !== undefined) {
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));
        let tasksBeforeToday = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isBefore(todaysDate)){
                return (
                    <ReturnTask
                        key={i} 
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}/>
                )
            } else return null;
        }); 
    return (<>{tasksBeforeToday}</>)
  }
}


// TASKS WITH SAME DATE AS TODAY 
export const tasksToday = (tasks, userID) => {
    if(tasks !== undefined) {
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));
        let tasksToday = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isSame(todaysDate)){
                return (
                    <ReturnTask
                        key={i} 
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}/>
                )
            } else return null;
        }); 
    return (<>{tasksToday}</>)
  }
}


// TASKS AFTER TODAYS DATE 
export const tasksAfterToday = (tasks, userID) => {
    if(tasks !== undefined) {
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));
        let tasksAfterToday = sortedTasks.map((task, i) => {
            if(moment(task.taskDate).isAfter(todaysDate)){
                return (
                    <ReturnTask
                        key={i} 
                        userID={userID}
                        taskChecked={task.taskChecked}
                        taskName={task.taskName}
                        taskID={task.taskID}
                        taskShortDate={task.taskShortDate}/>
                )
            } else return null;
        }); 
    return (<>{tasksAfterToday}</>)
   }
}


// TASKS THAT'S COMPLETED ON CHOSEN DAY 
export const tasksCompleted = (tasks, userID, thisDaysDate) => {
    if(tasks !== undefined) {
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));
        let tasksCompleted = sortedTasks.map((task, i) => {
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
                               taskShortDate={task.taskShortDate}/>
                        </div>
                    )
                }
            } else return null;
        }); 
    return (<>{tasksCompleted}</>)
   }
}


// TASKS THAT'S REMAINING ON CHOSEN DAY 
export const tasksRemaining = (tasks, userID, thisDaysDate) => {
    if(tasks !== undefined) {
        let sortedTasks = tasks.sort((a,b) => new moment(a.taskDate).format('YYYYMMDD') - new moment(b.taskDate).format('YYYYMMDD'));
        let tasksRemaining = sortedTasks.map((task, i) => {
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
                               taskShortDate={task.taskShortDate}/>
                        </div>
                    )
                }
            } else return null;
        }); 
    return (<>{tasksRemaining}</>)
   }
}