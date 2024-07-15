"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Grid from 'react-bootstrap/'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Page.module.css";
import React from "react";

const Columen = () => (
  <Col className="p-0">
    <Card className="p-2">
      <Card.Title className="text-center">Addidjjdid</Card.Title>
      <Card.Text>
        This is a simple word power application. Please sign up to create an
        account or log in to start using the app.
      </Card.Text>
      <Card.Text>
        This is a simple word power application. Please sign up to create an
        account or log in t
      </Card.Text>
      <Card.Text>
        This is a simple word power application. Please sign up to create an
        account or log in t
      </Card.Text>
    </Card>
  </Col>
);

function Home() {
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Title className="d-flex justify-content-center py-1">
              Propogation
            </Card.Title>
          </Card>
        </Col>
      </Row>
      <Row className={styles.gridContainer}>
        <Columen />
        <Columen />
        <Columen />
        <Columen />
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <Button variant="primary">Previous</Button>
        </Col>
        <Col className="text-center">
          <Button variant="primary">Change Pattern</Button>
        </Col>
        <Col className="text-center">
          <Button variant="primary">Next</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
