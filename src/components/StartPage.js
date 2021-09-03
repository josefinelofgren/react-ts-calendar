// import libaries
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function StartPage(){

    let history = useHistory();

    const handleClick = () => history.push('/users/signup')

    return(
        <Container>
            <div className='textbox startpage'>
                <h1 className='fw-bold display-3'>
                    Organisera livet med Calendar-todo
                </h1>
                <br /> 
                <Button 
                    className='fw-bold'
                    onClick={handleClick}>
                    Kom igång
                </Button>
                <br />
                <br />  
                <p>Har du redan ett konto?<Link to='/users/login'> Logga in</Link></p>
            </div>
        </Container>
    )

}


export default StartPage;