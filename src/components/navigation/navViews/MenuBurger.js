// import libaries
import React from 'react';
import { Link } from 'react-router-dom';


function MenuBurger({state, showState, className}){

    return(
        <Link
            to='#'
            className={state ? `menu-btn is-active ${className}` : `menu-btn ${className}`}
            onClick={showState}>
            <div className={state ? `menu-burger is-active ${className}`: `menu-burger ${className}`} />
        </Link>
    )

}


export default MenuBurger;