"use client";

import { ThemeContext } from "@/utils";
import { useContext } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

export function NavBar() {
  const { toggleTheme, theme } = useContext(ThemeContext);
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
                <Nav.Link href="#actioddn1">
                  <Image
                    onClick={toggleTheme}
                    src={
                      theme == "dark"
                        ? "/icons/darkmode.svg"
                        : "/icons/lightmode.svg"
                    }
                    alt="light/dark mode"
                    width={20}
                    height={20}
                  />
                </Nav.Link>
                <Nav.Link href="#action1">
                  <Link href="/">
                    Daily <span style={{ color: "red" }}>*</span>
                  </Link>
                </Nav.Link>
                <Nav.Link href="#action2">Weekely</Nav.Link>
                <Nav.Link href="#action2">Monthly</Nav.Link>
                <Nav.Link href="#action2">Yearly</Nav.Link>
                <Nav.Link className="bold">
                  <Link href="/addword">
                    <strong>Add Word</strong>
                  </Link>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
