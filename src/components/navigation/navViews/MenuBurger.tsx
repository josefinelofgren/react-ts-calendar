// import libaries
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

interface Props {
    sidenav: boolean,
    className: string,
    showSidenav(e: any, history: any): void
}

function MenuBurger(props: Props){

    const {sidenav, showSidenav, className} = props;
    let history = useHistory();

    return(
        <Link
            to='#'
            className={sidenav ? `menu-btn is-active ${className}` : `menu-btn ${className}`}
            onClick={(e) => showSidenav(e, history)}>
            <div className={sidenav ? `menu-burger is-active ${className}`: `menu-burger ${className}`} />
        </Link>
    )

}


export default MenuBurger;