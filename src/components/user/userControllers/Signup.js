import React, { useState} from 'react';
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

    const handleSubmit = (e, registerUser) => {
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
    }


    return(
        <SignupView
        email={email}
        setEmail={setEmail}
        passOne={passOne}
        setPassOne={setPassOne}
        passTwo={passTwo}
        setPassTwo={setPassTwo}
        handleSubmit={handleSubmit} /> 
    )
}

export default Signup;