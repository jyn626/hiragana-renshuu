import { useEffect, useRef, useState } from "react";
import "./App.css";
import { hiragana } from "./data/hiragana";
import { Link } from "react-router-dom";
import Header from "./components/common/Header";
import Page from "./components/common/Page";

function App() {
  const [flipped, setFlipped] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [shuffledFlashCards, setShuffledFlashCards] = useState([]);
  const [pastCharacters, setPastCharacters] = useState([]);
  const [unknownsLength, setUnknowsLength] = useState(0);
  const [knownsLength, setKnownsLength] = useState(0);
  const tableContainer = useRef(null);

  useEffect(() => {
    if (tableContainer.current) {
      tableContainer.current.scrollTo({
        top: tableContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [pastCharacters]);

  const storePastCharacter = (char, isKnown) => {
    if (currentFlashcardIndex >= shuffledFlashCards.length) {
      return;
    }

    if (isKnown) setKnownsLength(knownsLength + 1);
    else setUnknowsLength(unknownsLength + 1);

    setPastCharacters((prev) => [...prev, { ...char, isKnown }]);

    next();
  };

  const known = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];
    storePastCharacter(character, true);
  };

  const unknown = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];
    storePastCharacter(character, false);
  };

  function shuffleFlashCards(array) {
    const shuffled = shuffle([...array]);
    setShuffledFlashCards(shuffled);
  }

  useEffect(() => {
    shuffleFlashCards(hiragana);
  }, []);

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function next() {
    setCurrentFlashcardIndex((prev) => prev + 1);
    setFlipped(false);
  }

  const isFinished =
    pastCharacters.length >= shuffledFlashCards.length &&
    shuffledFlashCards.length > 0;

  return (
    <>
      <Page>
        {/* header */}
        <Header />
        {/* end header */}
        <div className="w-full flex flex-col items-center justify-center px-4 sm:px-0">
          {/* Flashcard */}
          <div
            key={currentFlashcardIndex}
            className={`relative border ${
              flipped ? "border-amber-500 border-2" : "border-slate-400"
            } text-black transition-all duration-100 w-full max-w-[300px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-sm p-2`}
            style={{ perspective: "1000px" }}
          >
            <div
              className={`flashcard-inner ${flipped ? "flipped" : ""} flashcard-slide`}
            >
              {/* Front */}
              <div className="flashcard-front">
                {!isFinished ? (
                  <p className="text-9xl text-center">
                    <span className="font-bolder">
                      {shuffledFlashCards[currentFlashcardIndex]?.hiragana}
                    </span>
                  </p>
                ) : (
                  <span className="text-sm text-center px-4">
                    You've finished all the flashcards! Check below for record.
                  </span>
                )}
              </div>

              {/* Back */}
              <div className="flashcard-back">
                {!isFinished && (
                  <p className="text-9xl text-center hover:scale-110 transition-all duration-150">
                    {shuffledFlashCards[currentFlashcardIndex]?.answer}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer absolute px-2 rounded-tl-sm right-0 bottom-0 text-sm bg-amber-100 hover:bg-amber-200 transition-all duration-100 text-gray-900 hover:text-black z-10"
            >
              flip
            </button>
          </div>

          <small className="mt-2 font-bold">
            {currentFlashcardIndex}/{shuffledFlashCards?.length}
          </small>

          {/* Buttons */}
          <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-[420px]">
            <div className="flex flex-col text-center flex-1">
              <button
                onClick={unknown}
                className="cursor-pointer bg-[#457B9D]/80 hover:bg-[#457B9D] text-center text-white px-2 text-sm w-full h-[64px] sm:h-[77px]"
              >
                I don't know{" "}
                <span className="font-bold text-xs">({unknownsLength})</span>
              </button>
              <small>わかりません</small>
            </div>
            <div className="flex flex-col text-center flex-1">
              <button
                onClick={known}
                className="cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50] text-center text-white px-2 text-sm w-full h-[64px] sm:h-[77px]"
              >
                I know{" "}
                <span className="font-bold text-xs">({knownsLength})</span>
              </button>
              <small>わかります</small>
            </div>
          </div>
        </div>

        {/* Records table */}
        <div className="my-12  w-full border-t border-b px-4 py-1 border-gray-200">
          <span className="text-xs font-bold">Results (けっか)</span>
        </div>

        <div
          ref={tableContainer}
          className=" w-full flex justify-center items-start max-h-[300px] sm:max-h-[300px] overflow-y-scroll mx-0"
        >
          <table className="w-full">
            <tbody className="border border-gray-200">
              <tr className="p-2 bg-slate-50">
                <th className="font-extralight px-2 sm:px-4 py-2 text-xs">
                  Hiragana
                </th>
                <th className="font-extralight px-2 sm:px-4 py-2 text-xs">
                  Answer
                </th>
                <th className="font-extralight px-2 sm:px-4 py-2 text-xs">
                  Result
                </th>
              </tr>
              {pastCharacters.map(({ hiragana, answer, isKnown }, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 text-center font-bold text-sm sm:text-base py-1">
                    {hiragana}
                  </td>
                  <td className="border border-gray-300 text-center text-sm sm:text-base py-1">
                    {answer}
                  </td>
                  <td className="border border-gray-300 text-center py-1">
                    <span className="font-extralight text-xs sm:text-sm">
                      {isKnown ? "ただし (✔️)" : "まちがい (❌)"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Page>
    </>
  );
}

export default App;
