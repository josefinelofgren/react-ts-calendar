// import libaries 
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io'
import { VscSignOut } from 'react-icons/vsc';

// import components
import { Navbar, Container } from 'react-bootstrap';
import NavbarBrand from './NavbarBrand';
import MenuBurger from './MenuBurger';

interface Props {
    sidenav: boolean, 
    user: any,
    howManyTasks: number
    logOutUser(e: any, history: any): void, 
    showSidenav(e: any, history: any): void 
}

interface States {
    
}


// navigation
function Navigation (props: Props, states: States){

    const {sidenav, showSidenav, user, logOutUser, howManyTasks} = props;

    let history = useHistory();
    const [notification, setNotification] = useState(false);

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
                <NavbarBrand user={user}/> 
            }
            {user && 
            <>
                <MenuBurger 
                  className='navigation'
                  sidenav={sidenav}
                  showSidenav={showSidenav}/> 
            </>
            }
                <div className='nav-link'>
                    {!user &&
                    <>
                        <Link
                          className='link text-secondary no-user'  
                          to='/react-calendar/users/login'>
                              Logga in
                        </Link>
                        <Link 
                          className='link text-secondary no-user'
                          to='/react-calendar/users/signup'>
                              Skapa konto
                        </Link>
                    </>
                    }
                    {user &&
                    <>
                        <Link
                          className='link text-secondary nav-icon user' 
                          onClick={e => logOutUser(e, history)}
                          to='/react-calendar'>
                              <VscSignOut className='icon-btn' /> 
                              <div className='info-bubble logout'>Logga ut</div>
                        </Link>
                        <Link 
                          className='link text-secondary nav-icon user'
                          to='#'>
                              <IoIosNotificationsOutline className='icon-btn'/> 
                              <div className='info-bubble notification'>Antal uppgifter kvar med deadline idag eller tidigare</div>
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