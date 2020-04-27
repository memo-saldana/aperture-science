import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button";
import { getToken, deleteToken, deleteUserId } from "./TokenUtilities";
import React from "react";

const TopNavbar = ({ history }) => {

    const _logout = _ => {
        deleteToken();
        deleteUserId();
        history.push("/");
    }

    const loggedInButtons = (
        <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/project">Project (Template)</Nav.Link>
            <Nav.Link href="/create-project">Create Project</Nav.Link>
            <Button variant="outline-info" href="/" className="ml-3" onClick={_logout}>Log out</Button>
        </Nav>
    );

    const loggedOutButtons = (
        <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/project">Project (Template)</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Button variant="outline-info" href="/signup" className="ml-3">Sign up</Button>
        </Nav>
    );

    const navButtons = getToken() ? loggedInButtons : loggedOutButtons;

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
                        {navButtons}
                </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar