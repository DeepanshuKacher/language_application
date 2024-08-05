"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Grid from 'react-bootstrap/'
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Page.module.css";
import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { EnglishUserWord } from "@prisma/client";
import {
  DayEnum,
  filterWordsByCategory,
  getRandomEnglishWordArray,
  pageType,
  shuffleArray,
} from "@/utils";
import { getWords } from "@/app/api/word/get";
import {
  incrementWordMemoryScore,
  updateWordUpdatedAt,
} from "@/app/api/word/clickedRightAnswer";
import { Column } from "@/components/Column";

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
  const [isElementClicked, setIsElementClicked] = useState(false);

  useEffect(() => {
    getWords()
      .then((data) => {
        setWords(data);
      })
      .catch((error) => {
        alert("Unable to fetch words");
        if (process.env.NODE_ENV === "development") console.log(error);
      });
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      if (params.dayenum in pageType) {
        const filteredWords = filterWordsByCategory(
          words,
          params.dayenum as DayEnum
        );

        setFilteredWords(filteredWords);
      } else if (process.env.NODE_ENV === "development")
        console.warn("not in page");
    }
  }, [words]);

  useEffect(() => {
    if (filteredWords.length > 0) {
      setQuestionWord(filteredWords[questionIndex]);

      reloadOptions(0);
    }
  }, [filteredWords]);

  // useEffect(() => {
  //   if (questionWord) console.log({ questionWord }, { optionsWord });
  // }, [questionWord, optionsWord]);

  const handleOptionClick = (id: string) => {
    if (questionWord?.id === id) {
      handleRightAnswer(id);
    } else {
      handleWrongAnswer();
    }

    setIsElementClicked(true);

    // handleNextQuestion();
  };

  const handleRightAnswer = (wordId: string) => {
    if (isCurrentAnswerClickedWrong === false) {
      incrementWordMemoryScore(wordId)
        .then(() => {
          setAnswerStatus("next");
        })
        .catch((error) => {
          alert("Unable to submit answer");
          if (process.env.NODE_ENV === "development") console.log(error);
        });
    } else {
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

  const handleWrongAnswer = () => {
    setIsCurrentAnswerClickedWrong(true);
  };

  const reloadOptions = (questionIndex: number) => {
    if (isElementClicked) setIsElementClicked(false);
    if (answerStatus === "next") setAnswerStatus("reload");

    const threeRandomWords = getRandomEnglishWordArray(
      words,
      3,
      filteredWords[questionIndex]
    );

    const tempWordStore: EnglishUserWord[] = [
      ...threeRandomWords,
      filteredWords[questionIndex],
    ];
    const shuffledArray = shuffleArray(tempWordStore);
    setOptionsWord(shuffledArray);
  };

  const handleNextQuestion = () => {
    console.log(questionIndex);
    const newQuestionIndex = questionIndex + 1;
    if (newQuestionIndex < filteredWords.length) {
      reloadOptions(newQuestionIndex);

      setIsCurrentAnswerClickedWrong(false);

      setQuestionWord(filteredWords[newQuestionIndex]);

      setQuestionIndex(newQuestionIndex);
    } else {
      alert("Question is over");
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
            isAlreadyClicked={isElementClicked}
          />
        ))}
      </Row>
      <Row className="my-3">
        {answerStatus === "reload" && filteredWords.length > 0 ? (
          <Col className="text-center">
            <Button
              onClick={() => reloadOptions(questionIndex)}
              variant="success"
            >
              <Image
                alt="show answer"
                aria-label="Show answer"
                width={20}
                height={20}
                src="/icons/reload.svg"
              />
            </Button>
          </Col>
        ) : filteredWords.length > 0 ? (
          <Col className="text-center">
            <Button onClick={handleNextQuestion} variant="success">
              <Image
                alt="show answer"
                aria-label="Show answer"
                width={20}
                height={20}
                src="/icons/next.svg"
              />
            </Button>
          </Col>
        ) : null}
        {filteredWords.length > 0 ? (
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
        ) : null}
      </Row>
    </Container>
  );
};

export default withPageAuthRequired(Home);
