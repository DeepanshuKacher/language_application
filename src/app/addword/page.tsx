"use client";
/*   id            String            @id @default(auto()) @map("_id") @db.ObjectId
  word          String
  meaning       String
  hindimeaning  String?
  description   String?
  typeofword    TypeOfEnglishWord
  UserWordScore UserWordScore[] */

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

enum TypeOfEnglishWord {
  adjective = "adjective",
  adverb = "adverb",
  conjunction = "conjunction",
  determiner = "determiner",
  noun = "noun",
  preposition = "preposition",
  pronoun = "pronoun",
  verb = "verb",
}

function AddWord() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [hindiMeaning, setHindiMeaning] = useState("");
  const [description, setDescription] = useState("");
  const [typeofWord, setTypeofWord] = useState<TypeOfEnglishWord>(
    TypeOfEnglishWord.noun
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <Form.Group controlId="word" className="mb-3">
        <Form.Label>Word</Form.Label>
        <Form.Control
          type="text"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="meaning" className="mb-3">
        <Form.Label>Meaning</Form.Label>
        <Form.Control
          required
          as="textarea"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="hindiMeaning" className="mb-3">
        <Form.Label>Hindi Meaning</Form.Label>
        <Form.Control
          as="textarea"
          value={hindiMeaning}
          onChange={(e) => setHindiMeaning(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="typeofWord" className="mb-3">
        <Form.Label>Type of Word</Form.Label>
        <Form.Control
          as="select"
          value={typeofWord}
          defaultValue="selectwordtype"
          onChange={(e) => setTypeofWord(e.target.value as TypeOfEnglishWord)}
        >
          {Object.values(TypeOfEnglishWord).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}

export default AddWord;
