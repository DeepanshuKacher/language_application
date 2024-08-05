import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { EnglishUserWord } from "@prisma/client";
import { useState } from "react";

export const Column = ({
  englishWord,
  flipMode,
  handleClick,
  questionWord,
  isAlreadyClicked,
}: {
  englishWord: EnglishUserWord;
  flipMode: boolean;
  handleClick: (id: string) => void;
  questionWord?: EnglishUserWord;
  isAlreadyClicked: boolean;
}) => {
  const [isClickedRight, setIsClickedRight] = useState<boolean | null>(null);

  const handleOnclick = () => {
    if (isAlreadyClicked)
      return alert("Already clicked \n please reload options");

    handleClick(englishWord.id);
    if (questionWord?.id === englishWord.id) setIsClickedRight(true);
    else setIsClickedRight(false);
  };

  return (
    <Col className="p-0">
      {flipMode ? (
        <Card
          onClick={handleOnclick}
          style={{ cursor: "pointer" }}
          className="p-2"
        >
          <Card.Title className="text-center">{englishWord.meaning}</Card.Title>
        </Card>
      ) : (
        <Card
          onClick={handleOnclick}
          style={{ cursor: "pointer" }}
          className={`p-2 ${
            isClickedRight === true
              ? "border-success"
              : isClickedRight === false
              ? "border-danger"
              : ""
          }`}
        >
          <Card.Text>Meaning:- {englishWord.meaning}</Card.Text>
          {englishWord.hindimeaning ? (
            <Card.Text>Hindi meaning:- {englishWord.hindimeaning}</Card.Text>
          ) : null}
          {englishWord.description ? (
            <Card.Text>Description:- {englishWord.description}</Card.Text>
          ) : null}
        </Card>
      )}
    </Col>
  );
};
