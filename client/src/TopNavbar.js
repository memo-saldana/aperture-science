import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button";
import React from "react";

const TopNavbar = () => {
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
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="/project">Project (Template)</Nav.Link>
                        <Nav.Link href="/login">Log in</Nav.Link>
                        <Button variant="outline-info" href="/signup">Sign up</Button>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar