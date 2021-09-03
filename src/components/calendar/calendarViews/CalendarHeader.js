// import libaries
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


function CalendarHeader({value, setValue}){

    const currentMonth = () => {
        return value.format('MMMM')
    }

    function currentYear() {
        return value.format('YYYY')
    }

    function prevMonth() {
        return value.clone().subtract(1, 'month')
    }

    function nextMonth() {
        return value.clone().add(1, 'month')
    }

    return ( 
        <div className='calendar-header'>
            <div className='calendar-header-content fw-bold'>
                <div 
                    className='calendar-icon inline-block'
                    onClick={() => setValue(prevMonth())}
                    >
                    <IoIosArrowBack />
                </div>
                <div 
                    className='calendar-month inline-block'
                    >
                    {currentMonth()} {currentYear()}
                </div>
                <div 
                    className='calendar-icon inline-block'
                    onClick={() => setValue(nextMonth())}
                    >
                    <IoIosArrowForward />
                </div>
            </div>
        </div>    
    )
}

export default CalendarHeader;