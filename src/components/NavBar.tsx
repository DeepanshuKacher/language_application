"use client";

import { useContext } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapImage from "react-bootstrap/Image";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Image from ''
import { useUser } from "@auth0/nextjs-auth0/client";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { UniversalContext } from "@/utils";

export function NavBar() {
  const { user } = useUser();

  const { toggleTheme, theme } = useContext(UniversalContext);
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
                <Nav.Link as={Link} href="/questions/daily">
                  Daily <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link as={Link} href="/questions/weekly">
                  Weekly <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link as={Link} href="/questions/monthly">
                  Monthly <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link as={Link} href="/questions/yearly">
                  Yearly <span style={{ color: "red" }}>*</span>
                </Nav.Link>
                <Nav.Link as={Link} href="/addword" className="bold">
                  <strong>Add Word</strong>
                </Nav.Link>

                {user ? (
                  <NavDropdown
                    title={
                      <BootstrapImage
                        src={user?.picture || "/icons/user.svg"}
                        roundedCircle
                        width={30}
                        alt="User Profile Image"
                        height={30}
                      />
                    }
                    id={`offcanvasNavbarDropdown-expand`}
                  >
                    <NavDropdown.Item href="/api/auth/logout">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
