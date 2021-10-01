// import libaries
import React from 'react';
import firebase from '../../Firebase';

//import components
import { IoTrashOutline, IoCheckmarkOutline } from 'react-icons/io5';

interface Props {
    taskChecked: boolean, 
    taskID: string,
    taskShortDate: string, 
    taskName: string, 
    userID: string | null
}


function ReturnTask (props: Props) {
    
    const { taskChecked, taskID, taskShortDate, taskName, userID } = props;

    // toggle checked task  
    const toggleCheck = (e: any, whichTask: string, taskChecked: boolean) => {
        e.preventDefault();

        const ref = firebase
        .database()
        .ref(`react-calendar/app/calendar/${userID}/${whichTask}/taskChecked`);
        
        if(taskChecked === false){
            ref.set(!taskChecked);
        } else if(taskChecked === true){
            ref.set(!taskChecked);
        }
    }

    // delete task 
    const deleteTask = (e:any, whichTask:string) => {
        e.preventDefault();

        const ref  = firebase.database().ref(`react-calendar/app/calendar/${userID}/${whichTask}`);
        ref.remove();
    }

    return(
        <div className={taskChecked ? 'sidenav-task checked' : 'sidenav-task'} key={taskID}>
            <div className={taskChecked ? 'capitalize-first task-name inline-block checked' : 'capitalize-first task-name inline-block'}>{taskName}</div>
            <IoCheckmarkOutline 
                onClick={e => toggleCheck(e, taskID, taskChecked)} 
                className={taskChecked ? 'task-icon checked check' : 'task-icon check'}
                /> 
            <IoTrashOutline 
                onClick={e => deleteTask(e, taskID)} 
                className='task-icon trash'
                />
            <div className='task-date'>{taskShortDate}</div>
        </div>
    )
}


export default ReturnTask;