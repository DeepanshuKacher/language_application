"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

export function NavBar() {
  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Word Power</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"xl"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"xl"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
                Word Power
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">
                  Daily <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link href="#action2">Weekely</Nav.Link>
                <Nav.Link href="#action2">Monthly</Nav.Link>
                <Nav.Link href="#action2">Yearly</Nav.Link>
                <Nav.Link className="bold" href="#action2">
                  <strong>Add Word</strong>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
