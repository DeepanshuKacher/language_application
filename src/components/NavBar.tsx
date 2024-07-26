"use client";

import { ThemeContext } from "@/utils";
import { useContext } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Image from ''
import { useUser } from "@auth0/nextjs-auth0/client";

export function NavBar() {
  const { user } = useUser();

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
                <Nav.Link>
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
                <Nav.Link as={Link} href="/">
                  Daily <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link as={Link} href="/addword" className="bold">
                  <strong>Add Word</strong>
                </Nav.Link>

                {user ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      className="dropdown-toggle"
                      id="dropdown-basic"
                      variant={theme === "dark" ? "secondary" : "primary"}
                    >
                      <Image
                        alt="Profile Pic"
                        src={user?.picture || "/icons/user.svg"}
                        width={30}
                        height={30}
                        className="rounded-circle"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="#/action-1">Profile</Dropdown.Item> */}

                      <Dropdown.Item href="/api/auth/logout">
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Nav.Link className="bold" href="/api/auth/login">
                    Login
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
