import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons"; 

function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/listings"> <FontAwesomeIcon className='icon' icon={faUtensils} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/listings">Home</Link>
                            <Link className="nav-link" to="/listings/new">Add new listing</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar