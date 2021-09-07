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
    const [errorMessage, setErrorMessage] = useState(null);

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
        .catch(error => {
            if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                setErrorMessage("Det finns ingen användare med den angivna e-postadressen.");
            } else if(error.message === "The password is invalid or the user does not have a password.") {
                setErrorMessage("Lösenordet är ogiligt.")
            } else {
                setErrorMessage(null);
            }
        })
    }

    return(
        <LoginView
          email={email}
          setEmail={setEmail}
          errorMessage={errorMessage}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        /> 
    )
}

export default Login;