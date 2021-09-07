// import libaries
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function StartPage({ user }){

    let history = useHistory();

    // if user is already logged in, direct to users calendar
    // else direct to startpage
    if(user !== null){
        history.push('/app/calendar');
    } else {
        history.push('/')
    };

    // handle click for button
    const handleClick = () => history.push('/react-calendar/users/signup')

    return(
        <Container>
            <div className='textbox startpage'>
                <h1 className='fw-bold display-3'>
                    Organisera livet med Calendar-todo
                </h1>
                <br /> 
                <Button 
                    className='fw-bold bg-color border-color'
                    onClick={handleClick}>
                    Kom igång
                </Button>
                <br />
                <br />  
                <p>Har du redan ett konto?<Link className='text-color' to='/react-calendar/users/login'> Logga in</Link></p>
            </div>
        </Container>
    )

}


export default StartPage;