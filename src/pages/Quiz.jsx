import { useState } from "react";
import Page from "../components/common/Page";
import Header from "../components/common/Header";

const data = {
  word: "すみません",
  wordTranslation: "Excuse me / I'm sorry",
  sentence: "すみません、えきはどこですか。",
  sentenceTranslation: "Excuse me, where is the train station?",
};

export default function Quiz() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Page>
        <Header />
        <div className="p-2 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            {/* Word */}
            <div className="mb-1">
              <h4 className="font-bold text-6xl">{data.word}</h4>
            </div>

            {/* Word translation */}
            <div
              className={`text-sm text-blue-400 mb-5 transition-all duration-300 ${revealed ? "opacity-100" : "opacity-0 select-none"}`}
            >
              {data.wordTranslation}
            </div>

            {/* Sentence */}
            <p>{data.sentence}</p>

            {/* Sentence translation */}
            <div
              className={`text-sm text-gray-400 mt-1 transition-all duration-300 ${revealed ? "opacity-100" : "opacity-0 select-none"}`}
            >
              {data.sentenceTranslation}
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              onClick={() => setRevealed((prev) => !prev)}
              className="cursor-pointer bg-blue-500/60 hover:bg-blue-500/90 text-xs px-4 py-2 text-white"
            >
              {revealed ? "hide" : "reveal"}
            </button>
          </div>
        </div>
      </Page>
    </>
  );
}
