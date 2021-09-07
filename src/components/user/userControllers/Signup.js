import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

//import components
import SignupView from '../userViews/SignupView'
import firebase from '../../../Firebase';

function Signup({registerUser}){

    let history = useHistory();

    // states
    const [email, setEmail] = useState('');
    const [passOne, setPassOne] = useState('');
    const [passTwo, setPassTwo] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {


        // check password requirements
        if(!passOne){
            setErrorMessage(null);
        } else if (passOne.length < 6){
            setErrorMessage('Lösenordet bör innehålla minst 6 tecken.');
        } else if(!passTwo) {
            setErrorMessage(null);
        } else if(passOne !== passTwo) {
            setErrorMessage('Lösenorden matchar inte.');
        } else {
            setErrorMessage(null);
        }

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        let registrationInfo = {
            email: email,
            password: passOne
        }

        firebase
        .auth()
        .createUserWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(() => {
            console.log('användare registrerad')
            registerUser(history);
        })
        .catch(error => {
            if(error.message === 'The email address is already in use by another account.'){
                console.log(error.message)
                setErrorMessage('E-postadressen används redan av en annan användare.');
            } else {
                setErrorMessage(null);
            }
        })
    }


    return(
        <SignupView
        email={email}
        errorMessage={errorMessage}
        setEmail={setEmail}
        passOne={passOne}
        setPassOne={setPassOne}
        passTwo={passTwo}
        setPassTwo={setPassTwo}
        handleSubmit={handleSubmit} /> 
    )
}

export default Signup;