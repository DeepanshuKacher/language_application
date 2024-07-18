"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Grid from 'react-bootstrap/'
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Page.module.css";
import { useState } from "react";

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
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Card className="p-2">
            <Card.Title className="text-center">Addidjjdid</Card.Title>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in to start using the app.
            </Card.Text>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in t
            </Card.Text>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in t
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row className={styles.gridContainer}>
        <Columen />
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
        <Columen />
        <Col className="p-0  ">
          <Card className="p-2 border-success bg-info-subtle">
            <Card.Title className="text-center">Addidjjdid</Card.Title>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in to start using the app.
            </Card.Text>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in t
            </Card.Text>
            <Card.Text>
              This is a simple word power application. Please sign up to create
              an account or log in t
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <Button variant="primary">
            <Image
              alt="back arrow"
              width={20}
              height={20}
              src="/icons/back.svg"
            />
          </Button>
        </Col>
        <Col className="text-center">
          <Button variant="success">
            <Image
              alt="show answer"
              aria-label="Show answer"
              width={20}
              height={20}
              src="/icons/show.svg"
            />
          </Button>
        </Col>
        <Col className="text-center">
          <Button variant="secondary">
            <Image
              alt="change pattern"
              width={20}
              height={20}
              src="/icons/swip.svg"
            />
          </Button>
        </Col>
        <Col className="text-center">
          <Button variant="primary">
            <Image
              alt="forward arrow"
              width={20}
              height={20}
              src="/icons/next.svg"
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
