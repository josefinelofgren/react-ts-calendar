import React, { Component } from 'react';

class FormError extends Component {
    render(){

        const {theMessage} = this.props;

        return(
            <div className="col-12 alert alert-warning error-message">
                {theMessage}
            </div> 
        );
    }
}

export default FormError;