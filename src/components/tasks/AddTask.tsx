// import libaries
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'

interface Props {
    day: any, 
    value: any,
    addTask(taskName: string, taskDate: string, taskShortDate: string, taskChecked: boolean): void
}


function AddTask(props: Props){

    const { day, value, addTask } = props;

    // states
    const [taskName, setTaskName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [taskShortDate, setTaskShortDate] = useState('')
    const [taskChecked, setTaskChecked] = useState(false)

    // check if day in calendar is selected
    function isSelected(day: any, value: { isSame: (arg0: any, arg1: string) => any; }) {
        return value.isSame(day, 'day');
    }

    // add classname if selected
    function showInputTask(day: any, value: { isSame: (arg0: any, arg1: string) => any; }) {
        if(isSelected(day, value)) return 'selected'
        return ''
    }

    // handle change
    const handleChange = (e:any) => {
        e.preventDefault();

        setTaskName(e.target.value);
        setTaskDate(e.target.id);
        setTaskShortDate(e.target.name);
        setTaskChecked(false);
    }

    // handle submit
    const handleSubmit = (e:any) => {
        e.preventDefault();

        addTask(taskName, taskDate, taskShortDate, taskChecked);
        setTaskName('');
        setTaskDate('');
        setTaskShortDate('');
        setTaskChecked(false);
    }

    return(
        <>
            <Form className={`${showInputTask(day, value)} input-task`} onSubmit={e => handleSubmit(e)}>
                <Form.Control
                    required
                    className='calendar-input'
                    type='text' 
                    placeholder='Lägg till uppgift..' 
                    id={`${day.format('YYYY/MM/DD')}`}
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