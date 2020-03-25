import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image'
import React, { useState } from "react";
import Row from "react-bootstrap/Row";

const TopNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Aperture Science</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Log in</Nav.Link>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar