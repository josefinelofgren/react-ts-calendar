//import libaries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 

//import components
import LoginView from '../userViews/LoginView';
import firebase from '../../../Firebase';


function Login(){

    const history = useHistory();

    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let registrationInfo = {
            email: email,
            password: password
        };

        firebase
        .auth()
        .signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(() => {
            history.push('/app/calendar');
        })
    }

    return(
        <LoginView
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        /> 
    )
}

export default Login;