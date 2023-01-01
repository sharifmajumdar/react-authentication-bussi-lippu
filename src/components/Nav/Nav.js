import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BusContext } from '../../App';
import IMG from "../../images/bus_icon.png";

const Nav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(BusContext);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="d-flex justify-content-start">
                    <Link className="navbar-brand" to="/"><img src={IMG} alt="" width="50px" height="50px" /></Link>
                    <h1 style={{ fontSize: "35px" }}><Link className="navbar-brand" to="/">Bussi Lippu</Link></h1>
                </div>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex justify-content-around">
                        <Link className="nav-item nav-link active" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/services">Services</Link>
                        <Link className="nav-item nav-link" to="/order">Order Review</Link>
                        <Link className="nav-item nav-link" to="/contact">Contact</Link>
                        {
                            loggedInUser.email ?
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {loggedInUser.email}
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link className="dropdown-item" to="/" onClick={() => setLoggedInUser({})}>Logout</Link>
                                        </div>
                                    </li>
                                </ul>
                                :
                                <Link className="nav-item nav-link btn btn-primary shadow" to="/login">Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;