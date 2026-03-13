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
    // 70                             70
    if (currentFlashcardIndex >= shuffledFlashCards.length) {
      console.log("finished", currentFlashcardIndex, shuffledFlashCards.length);
      return;
    }

    console.log(currentFlashcardIndex, shuffledFlashCards.length);

    if (isKnown) setKnownsLength(knownsLength + 1);
    else setUnknowsLength(unknownsLength + 1);

    setPastCharacters((prev) => {
      const updated = [
        ...prev,
        {
          ...char,
          isKnown,
        },
      ];

      console.log("kochii desuu", updated);
      return updated;
    });

    next();
  };

  const known = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];

    // store the character at `pastCharacters`
    // state and include a true value which
    // means the user knows this hiragana
    storePastCharacter(character, true);
  };

  const unknown = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];

    // store the character at `pastCharacters`
    // state and include a false value which
    // means the user does not knows this hiragana
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
    // if (currentFlashcardIndex >= shuffledFlashCards.length - 1) {
    //   console.log("completed all flashcards");
    //   return;
    // }

    setCurrentFlashcardIndex((prev) => prev + 1);
    setFlipped(false);
  }

  return (
    <>
      <Page>
        {/* header */}
        <Header></Header>
        {/* end header */}
        <div className="w-full flex flex-col items-center justify-center">
          <div
            className={`relative  border  ${flipped ? "border-amber-500  border-2" : "border-slate-400 "}  text-black  hover:shadow-inner transition-all duration-100 w-[300px] h-[300px] flex items-center justify-center rounded-sm p-2 `}
          >
            {pastCharacters.length < shuffledFlashCards.length ? (
              <p className="text-9xl text-center hover:scale-110 transition-all duration-150">
                {flipped ? (
                  shuffledFlashCards &&
                  shuffledFlashCards[currentFlashcardIndex].answer
                ) : (
                  <span className="font-bolder">
                    {shuffledFlashCards &&
                      shuffledFlashCards[currentFlashcardIndex]?.hiragana}
                  </span>
                )}
              </p>
            ) : (
              <span className="text-sm text-center">
                You've finished all the flashcards! check below for record.
              </span>
            )}

            <button
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer absolute px-2 rounded-tl-sm right-0 bottom-0 text-sm bg-amber-100 hover:bg-amber-200 transition-all duration-100 text-gray-900 hover:text-black"
            >
              flip
            </button>
          </div>
          <small className="mt-2 font-bold">
            {currentFlashcardIndex}/
            {shuffledFlashCards && shuffledFlashCards.length}
          </small>
          {/* buttons */}
          <div className="flex gap-4 mt-8">
            <div className="flex flex-col text-center">
              <button
                onClick={unknown}
                className="cursor-pointer  bg-[#457B9D]/80 hover:bg-[#457B9D] text-center  text-white px-2 text-sm w-[200px] h-[77px]"
              >
                I don't know{" "}
                <span className="font-bold text-xs"> ({unknownsLength}) </span>
              </button>
              <small>わかりません</small>
            </div>
            <div className="flex flex-col text-center">
              <button
                onClick={known}
                className=" cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-center text-white px-2 text-sm  w-[200px] h-[77px]"
              >
                I know
                <span className="font-bold text-xs"> ({knownsLength}) </span>
              </button>
              <small>わかります</small>
            </div>
          </div>
        </div>

        {/* records table */}
        <div className="mt-12"></div>
        <span className="text-sm font-extralight mb-2">Results (けっか )</span>
        <div
          ref={tableContainer}
          className=" border border-slate-200 rounded-sm p-2 w-full flex justify-center items-start  h-[368px] overflow-y-scroll"
        >
          <table className="w-full ">
            <tbody className="border border-gray-200">
              <tr className="p-2 bg-green-100 ">
                <th className="font-extralight px-4 py-2 text-sm">Hiragana</th>
                <th className="font-extralight px-4 py-2 text-sm">Answer</th>
                {/* TODO: find a better label than this lol */}
                <th className="font-extralight px-4 py-2 text-sm">
                  Is correct?
                </th>
              </tr>
              {pastCharacters.map(({ hiragana, answer, isKnown }) => {
                return (
                  <tr>
                    <td className="border border-gray-300 text-center font-bold">
                      {hiragana}
                    </td>
                    <td className="border border-gray-300 text-center">
                      {answer}
                    </td>
                    <td className="border border-gray-300 text-center">
                      <span className="font-extralight text-sm">
                        {isKnown ? "せいかい (✔️)" : "まちがい (❌)"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Page>
    </>
  );
}

export default App;
