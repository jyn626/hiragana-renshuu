import { useState, useEffect, useRef } from "react";
import Page from "../components/common/Page";
import Header from "../components/common/Header";

const quizData = [
  {
    word: "すみません",
    wordTranslation: "Excuse me / I'm sorry",
    sentence: "すみません、えきはどこですか。",
    sentenceTranslation: "Excuse me, where is the train station?",
  },
  {
    word: "ありがとう",
    wordTranslation: "Thank you",
    sentence: "たすけてくれて、ありがとうございます。",
    sentenceTranslation: "Thank you for helping me.",
  },
  {
    word: "おはよう",
    wordTranslation: "Good morning",
    sentence: "おはようございます、きょうはいいてんきですね。",
    sentenceTranslation: "Good morning, the weather is nice today, isn't it?",
  },
  {
    word: "たべる",
    wordTranslation: "To eat",
    sentence: "わたしはすしをたべるのがすきです。",
    sentenceTranslation: "I like eating sushi.",
  },
  {
    word: "みず",
    wordTranslation: "Water",
    sentence: "みずをいっぱいのんでください。",
    sentenceTranslation: "Please drink a lot of water.",
  },
  {
    word: "がっこう",
    wordTranslation: "School",
    sentence: "まいにちがっこうにいきます。",
    sentenceTranslation: "I go to school every day.",
  },
  {
    word: "ともだち",
    wordTranslation: "Friend",
    sentence: "かれはわたしのいちばんのともだちです。",
    sentenceTranslation: "He is my best friend.",
  },
  {
    word: "よむ",
    wordTranslation: "To read",
    sentence: "まいばんほんをよみます。",
    sentenceTranslation: "I read a book every night.",
  },
  {
    word: "でんしゃ",
    wordTranslation: "Train",
    sentence: "でんしゃにのっておおさかにいきました。",
    sentenceTranslation: "I took the train to Osaka.",
  },
  {
    word: "すき",
    wordTranslation: "Like / Fond of",
    sentence: "あなたのことがすきです。",
    sentenceTranslation: "I like you.",
  },
];

export default function Reading() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const intervalRef = useRef(null);

  const current = quizData[index];

  const handleReveal = () => {
    setRevealed(true);
    setCountdown(2);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    if (countdown !== 0) return;
    clearInterval(intervalRef.current);
    setRevealed(false);
    setCountdown(null);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % quizData.length);
    }, 150);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const isDisabled = countdown !== 0 && countdown !== null;

  return (
    <>
      <Page>
        <Header />
        <div className="p-2 w-full flex flex-col items-center justify-center">
          {/* Progress */}
          <p className="text-xs text-gray-300 mb-6">
            {index + 1} / {quizData.length}
          </p>

          <div className="flex flex-col justify-center items-center">
            {/* Word */}
            <div className="mb-1">
              <h4 className="font-bold text-6xl">{current.word}</h4>
            </div>

            {/* Word translation */}
            <div
              className={`text-sm text-blue-400 mb-5 transition-all duration-300 ${revealed ? "opacity-100" : "opacity-0 select-none"}`}
            >
              {current.wordTranslation}
            </div>

            {/* Sentence */}
            <p>{current.sentence}</p>

            {/* Sentence translation */}
            <div
              className={`text-sm text-gray-400 mt-1 transition-all duration-300 ${revealed ? "opacity-100" : "opacity-0 select-none"}`}
            >
              {current.sentenceTranslation}
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            {!revealed ? (
              <button
                onClick={handleReveal}
                className="cursor-pointer bg-blue-500/60 hover:bg-blue-500/90 text-xs px-4 py-2 text-white"
              >
                reveal
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isDisabled}
                className={`text-xs px-4 py-2 text-white transition-all duration-300 ${
                  isDisabled
                    ? "bg-green-500/30 cursor-not-allowed"
                    : "bg-green-500/60 hover:bg-green-500/90 cursor-pointer"
                }`}
              >
                {isDisabled ? `next (${countdown})` : "next →"}
              </button>
            )}
          </div>
        </div>
      </Page>
    </>
  );
}
