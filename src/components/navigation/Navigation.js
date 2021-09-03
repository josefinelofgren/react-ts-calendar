// import libaries
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io'

// import components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from './navViews/NavbarBrand';
import MenuBurger from './navViews/MenuBurger';


// navigation
function Navigation ({sidenav, showSidenav, user, logOutUser, howManyTasks}){

    let history = useHistory();

    return(
        <Navbar bg={user ? 'info' : 'transparent'} expand='lg' className={user ? 'shadow-5-strong border-bottom-thin' : ''}>
            <Container fluid className='nav'>
            {!user &&
                <NavbarBrand /> 
            }
            {user && 
            <>
                <MenuBurger 
                  sidenav={sidenav}
                  showSidenav={showSidenav}/> 
            </>
            }
                <div className='nav-link'>
                    {!user &&
                    <>
                        <Link
                          className='link text-secondary no-user'  
                          to='/users/login'>
                              Logga in
                        </Link>
                        <Link 
                          className='link text-secondary no-user'
                          to='/users/signup'>
                              Skapa konto
                        </Link>
                    </>
                    }
                    {user &&
                    <>
                        <Link
                          className='link text-white user' 
                          onClick={e => logOutUser(e, history)}
                          to='/'>
                              Logga ut
                        </Link>
                        <Link 
                          className='link text-white nav-icon user'
                          to='#'>
                              <IoIosNotificationsOutline /> 
                              <div className='notification-bubble text-white fw-bold'>{howManyTasks}</div>
                        </Link>
                    </>
                    }
                </div>
            </Container>
        </Navbar>
    )
}


export default Navigation;