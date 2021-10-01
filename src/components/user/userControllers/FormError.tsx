import React, { Component } from 'react';

interface Props {
    errorMessage: string | null
}

function FormError(props: Props){
    const {errorMessage} = props;

        return(
            <div className="col-12 alert alert-warning error-message">
                {errorMessage}
            </div> 
        );
}

export default FormError;