import Navbar from 'react-bootstrap/Navbar';
import NavButtons from './NavButtons';
import { getUserId, deleteToken, deleteUserId } from "./TokenUtilities";
import React from "react";
import { useHistory } from "react-router-dom";

const TopNavbar = ({ status }) => {

    let history = useHistory();
    const _logout = _ => {
        deleteToken();
        deleteUserId();
        history.push("/");
    }
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt="aperture science logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Aperture_Science_Logo.svg/1200px-Aperture_Science_Logo.svg.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Aperture Science
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavButtons userId={getUserId()} loggedIn={status} _logout={_logout} />
                </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar
