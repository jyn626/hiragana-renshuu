import { useState, useEffect, useRef } from "react";
import Page from "../components/common/Page";
import Header from "../components/common/Header";
import { quizData } from "../data/quiz";

export default function Reading() {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [remaining, setRemaining] = useState([]);
  const [current, setCurrent] = useState(null);
  const intervalRef = useRef(null);

  // initialize remaining questions on mount
  useEffect(() => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setRemaining(shuffled);
    setCurrent(shuffled[0]);
  }, []);

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
      if (remaining.length <= 1) {
        // all done, reshuffle
        const reshuffled = [...quizData].sort(() => Math.random() - 0.5);
        setRemaining(reshuffled);
        setCurrent(reshuffled[0]);
      } else {
        const [next, ...rest] = remaining.slice(1);
        setRemaining(rest);
        setCurrent(next);
      }
    }, 150);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const isDisabled = countdown !== 0 && countdown !== null;

  return (
    <Page>
      <Header />
      <div className="p-2 w-full flex flex-col items-center justify-center">
        {/* Progress */}
        <p className="text-xs text-gray-300 mb-6">
          {quizData.length - remaining.length + 1} / {quizData.length}
        </p>

        <div className="flex flex-col justify-center items-center">
          {/* Word */}
          <div className="mb-1">
            <h4 className="font-bold text-6xl">{current?.word}</h4>
          </div>

          {/* Word translation */}
          <div
            className={`text-md text-blue-400 mb-5 transition-all duration-300 ${
              revealed ? "opacity-100" : "opacity-0 select-none"
            }`}
          >
            {current?.wordTranslation}
          </div>

          {/* Sentence */}
          <p className="text-2xl">{current?.sentence}</p>

          {/* Sentence translation */}
          <div
            className={`text-sm text-gray-400 mt-1 transition-all duration-300 ${
              revealed ? "opacity-100" : "opacity-0 select-none"
            }`}
          >
            {current?.sentenceTranslation}
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
  );
}
