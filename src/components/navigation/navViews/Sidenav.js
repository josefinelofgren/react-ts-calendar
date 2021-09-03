// import libaries
import React from 'react';
import moment from 'moment';
import 'moment/locale/sv'
import firebase from '../../../Firebase';

// import components
import { IoIosArrowForward } from 'react-icons/io';
import { IoTrashOutline, IoCheckmarkOutline } from 'react-icons/io5';


function Sidenav({sidenav, tasks, day, userID}){

    moment.locale('sv');
    let todaysDate = moment().format('YYYYMMDD');
    let todaysDateDayAndMonth = moment().format('DD MMM');

    let beforeToday;
    let today;
    let afterToday;


    if(tasks !== undefined){

    // get tasks with deadline before todays date
    beforeToday = tasks.map((task, i) => {
        if(moment(task.taskDate).isBefore(todaysDate)){
            return (
                <div className='sidenav-task' key={i}>
                    <div className='capitalize-first task-name inline-block'>{task.taskName}</div>
                    <IoCheckmarkOutline onClick={e => toggleCheck(e, task.taskID, task.taskChecked)} className='task-icon check'/> 
                    <IoTrashOutline onClick={e => deleteTask(e, task.taskID)} className='task-icon trash'/>
                    <div className='task-date'>{task.taskShortDate}</div>
                </div>
            )
        }
    }); 

    // get tasks with deadline on todays date
    today = tasks.map((task, i) => {
        if(moment(task.taskDate).isSame(todaysDate)){
            return (
                <div className='sidenav-task' key={i}>
                    <div className='capitalize-first task-name inline-block'>{task.taskName}</div>
                    <IoCheckmarkOutline onClick={e => toggleCheck(e, task.taskID, task.taskChecked)}className='task-icon check'/> 
                    <IoTrashOutline onClick={e => deleteTask(e, task.taskID)} className='task-icon trash'/>
                    <div className='task-date'>{task.taskShortDate}</div>
                </div>
            )
        }
    }); 

    // get tasks with deadline after today date
    afterToday = tasks.map((task, i) => {
        if(moment(task.taskDate).isAfter(todaysDate)){
            return (
                <div className='sidenav-task' key={task.taskID}>
                    <div className='capitalize-first task-name inline-block'>{task.taskName}</div>
                    <IoCheckmarkOutline onClick={e => toggleCheck(e, task.taskID, task.taskChecked)} className='task-icon check'/> 
                    <IoTrashOutline onClick={e => deleteTask(e, task.taskID)} className='task-icon trash'/>
                    <div className='task-date'>{task.taskShortDate}</div>
                </div>
            )
        }
    });
};

   

    // toggle dropdown 
    const toggleDropDown = (e) => {

        if(tasks !== undefined){
            e.preventDefault();

            let parentElement = e.target.parentElement.parentElement.parentElement;
            let secondChild = parentElement.children[1];
            let arrow = parentElement.children[0].children[0].children[0];

            arrow.classList.toggle('rotate');
            secondChild.classList.toggle('hide');
       }
    };
    

    
    // toggle checked task  
    const toggleCheck = (e, whichTask, taskChecked) => {
        e.preventDefault();

        let element = e.target;
        let parentElement = e.target.parentElement;
        let firstChild = parentElement.children[0];

        const ref = firebase
        .database()
        .ref(`/app/calendar/${userID}/${whichTask}/taskChecked`);

        if(taskChecked === false){
            ref.set(!taskChecked);
            element.classList.add('checked');
            parentElement.classList.add('checked');
            firstChild.classList.add('checked');
        } else if(taskChecked === true){
            ref.set(!taskChecked);
            element.classList.remove('checked');
            parentElement.classList.remove('checked');
            firstChild.classList.remove('checked');
        }
    }


    // delte task 
    const deleteTask = (e, whichTask) => {
        e.preventDefault();

        const ref  = firebase.database().ref(`app/calendar/${userID}/${whichTask}`);
        ref.remove();
    }
    

    return (

            <div className={sidenav ? 'sidenav' : 'sidenav is-active'}>
                <div className='dropdown'>
                    <div className='fw-bold dropdown-category'>
                        <div className='nav-link-dropdown'><IoIosArrowForward className='arrow inline-block rotate' onClick={e => toggleDropDown(e)}/><p className='inline-block' onClick={e => toggleDropDown(e)}>Mina uppgifter</p></div>
                    </div>
                    <ul className='dropdown-content hide'>
                        <div className="list-group list-group-flush">
                            <div className='sidenav-category previous'>
                                <div className='sidenav-title border-bottom-dark fw-bold'>
                                Förfallna
                                </div>
                                <div className='sidenav-tasks'>{beforeToday}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-dark fw-bold today'>
                                {todaysDateDayAndMonth}{' '}•{' '}Idag
                                </div>
                                <div className='sidenav-tasks'>{today}</div>
                            </div>
                            <div className='sidenav-category'>
                                <div className='sidenav-title border-bottom-dark fw-bold'>
                                Kommande
                                </div>
                                <div className='sidenav-tasks'>{afterToday}</div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
    )
}

export default Sidenav;