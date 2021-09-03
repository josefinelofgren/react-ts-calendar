// import libaries
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'


function AddTask({day, value, addTask}){

    // states
    const [taskName, setTaskName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [taskShortDate, setTaskShortDate] = useState('')
    const [taskChecked, setTaskChecked] = useState('')

    // check if day in calendar is selected
    function isSelected(day, value) {
        return value.isSame(day, 'day');
    }

    // add classname if selected
    function showInputTask(day, value) {
        if(isSelected(day, value)) return 'selected'
        return ''
    }

    // handle change
    const handleChange = (e) => {
        e.preventDefault();

        setTaskName(e.target.value);
        setTaskDate(e.target.id);
        setTaskShortDate(e.target.name);
        setTaskChecked(false);
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        addTask(taskName, taskDate, taskShortDate, taskChecked);
        setTaskName('');
        setTaskDate('');
        setTaskShortDate('');
        setTaskChecked('');
    }

    return(
        <>
            <Form className={`${showInputTask(day, value)} input-task`} onSubmit={e => handleSubmit(e)}>
                <Form.Control
                    className='calendar-input'
                    type='text' 
                    placeholder='Lägg till uppgift..' 
                    id={`${day.format('YYYYMMDD')}`}
                    name={`${day.format('DD MMM')}`}
                    value={taskName}
                    onChange={e => handleChange(e)} />
                <Button 
                    type='submit'
                    hidden>
                    +
                </Button>
            </Form>
        </>
    )
}

export default AddTask;