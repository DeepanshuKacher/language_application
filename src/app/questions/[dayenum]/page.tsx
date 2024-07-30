"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Grid from 'react-bootstrap/'
import Card from "react-bootstrap/Card";
import Image from "next/image";
import dayjs from "dayjs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Page.module.css";
import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { EnglishUserWord } from "@prisma/client";
import { DayEnum, getRandomElements, pageType } from "@/utils";
import { getWords } from "@/app/api/word/get";
import {
  incrementWordMemoryScore,
  updateWordUpdatedAt,
} from "@/app/api/word/clickedRightAnswer";

const Column = ({
  englishWord,
  flipMode,
  handleClick,
  questionWord,
}: {
  englishWord: EnglishUserWord;
  flipMode: boolean;
  handleClick: (id: string) => void;
  questionWord?: EnglishUserWord;
}) => {
  const [isClickedRight, setIsClickedRight] = useState<boolean | null>(null);

  const handleOnclick = () => {
    handleClick(englishWord.id);
    if (questionWord?.id === englishWord.id) setIsClickedRight(true);
    else setIsClickedRight(false);
  };

  return (
    <Col onClick={handleOnclick} className="p-0">
      {flipMode ? (
        <Card style={{ cursor: "pointer" }} className="p-2">
          <Card.Title className="text-center">{englishWord.meaning}</Card.Title>
        </Card>
      ) : (
        <Card
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

// const SignAccordingToAnswerStatus = ({
//   answerStatus,
// }: {
//   answerStatus: "hide" | "show" | "reload" | "next";
// }) => {
//   switch (answerStatus) {
//     case "hide":
//       return (
//         <Col className="text-center">
//           <Button variant="success">
//             <Image
//               alt="show answer"
//               aria-label="Show answer"
//               width={20}
//               height={20}
//               src="/icons/reload.svg"
//             />
//           </Button>
//         </Col>
//       );
//     case "show":
//       return <div>Your answer is correct.</div>;
//     case "reload":
//       return <div>Please try again.</div>;
//     case "next":
//       return (
//         <div>
//           <Button variant="primary" onClick={() => window.location.reload()}>
//             Next
//           </Button>
//         </div>
//       );
//   }
// };

const filterWordsByCategory = (
  words: EnglishUserWord[],
  category: DayEnum
): EnglishUserWord[] => {
  const now = dayjs();

  switch (category) {
    case "daily":
      return words.filter(
        (word) =>
          word.wordMemoryScore <= 6 && now.diff(word.updatedAt, "D") >= 12
      );

    case "weekly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 7 &&
          word.wordMemoryScore <= 10 &&
          now.diff(word.updatedAt, "week") >= 1
      );

    case "monthly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 11 &&
          word.wordMemoryScore <= 13 &&
          now.diff(word.updatedAt, "month") >= 1
      );

    case "yearly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 14 &&
          word.wordMemoryScore <= 15 &&
          now.diff(word.updatedAt, "year") >= 1
      );
  }
};

const shuffleArray: <T>(array: T[]) => T[] = (array) => {
  const shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Home = ({ params }: { params: { dayenum: string } }) => {
  const [answerStatus, setAnswerStatus] = useState<"reload" | "next">("reload");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [words, setWords] = useState<EnglishUserWord[]>([]);
  const [filteredWords, setFilteredWords] = useState<EnglishUserWord[]>([]);
  const [questionWord, setQuestionWord] = useState<EnglishUserWord>();
  const [optionsWord, setOptionsWord] = useState<EnglishUserWord[]>([]);
  const [isCurrentAnswerClickedWrong, setIsCurrentAnswerClickedWrong] =
    useState(false);
  const [flipMode, setFlipMode] = useState(false);

  useEffect(() => {
    getWords()
      .then((data) => {
        setWords(data);
        if (params.dayenum in pageType) {
          const filteredWords = filterWordsByCategory(
            data,
            params.dayenum as DayEnum
          );

          setFilteredWords(filteredWords);
        } else if (process.env.NODE_ENV === "development")
          console.warn("not in page");
      })
      .catch((error) => {
        alert("Unable to fetch words");
        if (process.env.NODE_ENV === "development") console.log(error);
      });
  }, []);

  useEffect(() => {
    handleNextQuestion();
  }, [filteredWords]);

  useEffect(() => {
    console.log({ questionWord }, { optionsWord });
  }, [questionWord, optionsWord]);

  const handleOptionClick = (id: string) => {
    if (questionWord?.id === id) {
      handleRightAnswer(id);
    } else {
      handleWrongAnswer(id);
    }

    // handleNextQuestion();
  };

  const handleRightAnswer = (wordId: string) => {
    if (isCurrentAnswerClickedWrong === false)
      incrementWordMemoryScore(wordId)
        .then(() => {
          setAnswerStatus("next");
        })
        .catch((error) => {
          alert("Unable to submit answer");
          if (process.env.NODE_ENV === "development") console.log(error);
        });
    else {
      updateWordUpdatedAt(wordId)
        .then(() => {
          setAnswerStatus("next");
        })
        .catch((error) => {
          alert("Unable to update word");
          if (process.env.NODE_ENV === "development") console.log(error);
        });
    }
  };

  const handleWrongAnswer = (wordId: string) => {
    setIsCurrentAnswerClickedWrong(true);
  };

  const reloadOptions = () => {
    const threeRandomWords = getRandomElements<EnglishUserWord>(
      filteredWords,
      3
    );

    let tempWordStore: EnglishUserWord[] = [
      ...threeRandomWords,
      filteredWords[questionIndex],
    ];

    if (questionWord) {
      tempWordStore = [...threeRandomWords, questionWord];
    } else {
      tempWordStore = [...threeRandomWords, filteredWords[questionIndex]];
    }

    const shuffledArray = shuffleArray(tempWordStore);
    setOptionsWord(shuffledArray);
  };

  const handleNextQuestion = () => {
    if (questionIndex < filteredWords.length) {
      setIsCurrentAnswerClickedWrong(false);
      setQuestionWord(filteredWords[questionIndex]);

      reloadOptions();

      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          {flipMode ? (
            <Card className="p-2">
              <Card.Text>Meaning:- {questionWord?.meaning}</Card.Text>
              {questionWord?.hindimeaning ? (
                <Card.Text>
                  Hindi meaning:- {questionWord.hindimeaning}
                </Card.Text>
              ) : null}
              {questionWord?.description ? (
                <Card.Text>Description:- {questionWord.description}</Card.Text>
              ) : null}
            </Card>
          ) : (
            <Card className="p-2">
              <Card.Title className="text-center">
                {questionWord?.word}{" "}
                <small className="fst-italic fs-6">
                  {questionWord?.typeofword}
                </small>
              </Card.Title>
            </Card>
          )}
        </Col>
      </Row>
      <Row className={styles.gridContainer}>
        {optionsWord.map((option, index) => (
          <Column
            handleClick={handleOptionClick}
            englishWord={option}
            flipMode={flipMode}
            key={option.id + index}
            questionWord={questionWord}
          />
        ))}
      </Row>
      <Row className="my-3">
        {answerStatus === "reload" ? (
          <Col onClick={reloadOptions} className="text-center">
            <Button variant="success">
              <Image
                alt="show answer"
                aria-label="Show answer"
                width={20}
                height={20}
                src="/icons/reload.svg"
              />
            </Button>
          </Col>
        ) : (
          <Col onClick={handleNextQuestion} className="text-center">
            <Button variant="success">
              <Image
                alt="show answer"
                aria-label="Show answer"
                width={20}
                height={20}
                src="/icons/next.svg"
              />
            </Button>
          </Col>
        )}
        <Col className="text-center">
          <Button disabled variant="secondary">
            <Image
              alt="change pattern"
              width={20}
              height={20}
              src="/icons/swip.svg"
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default withPageAuthRequired(Home);
