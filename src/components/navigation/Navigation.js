// import libaries 
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io'

// import components
import { Navbar, Container } from 'react-bootstrap';
import NavbarBrand from './navViews/NavbarBrand';
import MenuBurger from './navViews/MenuBurger';


// navigation
function Navigation ({sidenav, showSidenav, user, logOutUser, howManyTasks}){

    let history = useHistory();

    const [notification, setNotification] = useState(null);

    useEffect(() => {

        if(howManyTasks === 0){
            setNotification(false);
        } else {
            setNotification(true);
        }

    },[howManyTasks]);

    return(
        <Navbar bg={user ? 'transparent' : 'transparent'} expand='lg' className={user ? 'shadow-5-strong border-bottom-thin' : ''}>
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
                          className='link text-secondary user' 
                          onClick={e => logOutUser(e, history)}
                          to='/'>
                              Logga ut
                        </Link>
                        <Link 
                          className='link text-secondary nav-icon user'
                          to='#'>
                              <IoIosNotificationsOutline /> 
                              <div className={notification ? 'notification-bubble text-white fw-bold is-active' : 'notification-bubble text-white fw-bold'}>{howManyTasks}</div>
                        </Link>
                    </>
                    }
                </div>
            </Container>
        </Navbar>
    )
}


export default Navigation;