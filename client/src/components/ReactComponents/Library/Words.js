import React, { useState } from "react";
import { translateWord } from "../../../ApiClient.js";
import TranslationBox from "./TranslationBox.js";
import "./library.css";

function Words({ word }) {
  const [displayTranslation, seDisplayTranslation] = useState(false);
  const [translatedWord, setTranslatedWord] = useState("");

  async function translate() {
    const translation = await translateWord(word.word);
    setTranslatedWord(translation.data.translations[0].translatedText);
    seDisplayTranslation(!displayTranslation);
  }

  return (
    <div>
      <div className="individual-word" onClick={translate}>
        <p> {word.word} </p>
      </div>
      {displayTranslation && (
        <div className="translation-box">
          <TranslationBox translation={translatedWord} />
        </div>
      )}
    </div>
  );
}

export default Words;
