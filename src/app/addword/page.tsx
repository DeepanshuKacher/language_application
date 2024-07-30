"use client";

import { initialState, response_message } from "@/utils";
import { TypeOfEnglishWord } from "@prisma/client";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import { useFormState } from "react-dom";
import { createWord } from "../api/word/create";
import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
// import { createWord } from "../lib/actions";

function AddWord() {
  const router = useRouter();
  // const [state, formAction] = useFormState(createWord, initialState);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (state.message === response_message.creation_success.message) {
  //     router.push("/");
  //   } else if (state.message === response_message.creation_error.message) {
  //     alert(response_message.creation_error.message);
  //     setLoading(false);
  //   }
  // }, [state.message]);

  const addWord = (e: FormData) => {
    setLoading(true);

    // to prevent multiple clicks
    setTimeout(() => {
      createWord(e)
        .then((response) => router.push("/"))
        .catch((error) => {
          alert("Unable to add word");
          if (process.env.NODE_ENV === "development") console.log(error);
          setLoading(false);
        });
    }, 50);

    // setTimeout(() => {
    //   formAction(e);
    // }, 500);
  };

  /*   async function createWord(formData: FormData) {
    "use server";
    const session = await getSession();

    const rawFormData = {
      word: formData.get("word"),
      meaning: formData.get("meaning"),
      hindimeaning: formData.get("hindimeaning"),
      description: formData.get("description"),
      typeofword: formData.get("typeofword"),
      userEmailId: session?.user.email,
    };

    try {
      const wordData = parse(wordScheme, rawFormData);

      const data = await prisma.englishUserWord.create({
        data: wordData,
      });

      // return data;
    } catch (error) {
      console.log(error);
    }

    // mutate data
    // revalidate cache
  } */

  return (
    <form className="p-4" action={addWord}>
      <div className="mb-3">
        <label htmlFor="word" className="form-label">
          Word
        </label>
        <input
          type="text"
          className="form-control"
          id="word"
          name="word"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="meaning" className="form-label">
          Meaning
        </label>
        <textarea
          className="form-control"
          id="meaning"
          name="meaning"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="hindimeaning" className="form-label">
          Hindi Meaning
        </label>
        <textarea
          className="form-control"
          id="hindimeaning"
          name="hindimeaning"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="typeofword" className="form-label">
          Type of Word
        </label>
        <select
          className="form-select"
          id="typeofword"
          name="typeofword"
          defaultValue=""
        >
          <option disabled value="">
            Select
          </option>
          {Object.values(TypeOfEnglishWord).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary mt-3">
        {loading ? <Spinner size="sm" /> : "Submit"}
      </button>
    </form>
  );
}

export default withPageAuthRequired(AddWord);
