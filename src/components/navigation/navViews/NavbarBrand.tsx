// import libaries
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai'

// import components
import Navbar from 'react-bootstrap/Navbar';

interface Props {
    user: any
}

function NavbarBrand(props: Props){

    const { user } = props;
    
    return(
        <Navbar.Brand>
            <Link className={!user ? 'fw-bold text-dark brand' : 'fw-bold text-light navbar-brand-sidenav brand'} to='/'>
                <AiOutlineCalendar className='text-color'/> 
                {' '}
                Calendar-todo
            </Link>
        </Navbar.Brand>
    )
}

export default NavbarBrand;