import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

const NavButtons = ({ loggedIn, _logout }) => {
    
    const loggedInButtons = (
        <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/my-projects">My Projects</Nav.Link>
            <Nav.Link href="/create-project">Create Project</Nav.Link>
            <Button variant="outline-info" href="/" className="ml-3" onClick={_logout}>Log out</Button>
        </Nav>
    );
    
    const loggedOutButtons = (
        <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Button variant="outline-info" href="/signup" className="ml-3">Sign up</Button>
        </Nav>
    );

    return loggedIn ? loggedInButtons : loggedOutButtons;
}

export default NavButtons;