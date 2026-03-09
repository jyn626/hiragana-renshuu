import { useEffect, useState } from "react";
import "./App.css";
import { hiragana } from "./data/hiragana";
function App() {
  const [flipped, setFlipped] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [shuffledFlashCards, setShuffledFlashCards] = useState([]);
  const [pastCharacters, setPastCharacters] = useState([]);
  const [unknownsLength, setUnknowsLength] = useState(0);
  const [knownsLength, setKnownsLength] = useState(0);

  const storePastCharacter = (char, isKnown) => {
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
  };

  const known = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];

    // store the character at `pastCharacters`
    // state and include a true value which
    // means the user knows this hiragana
    storePastCharacter(character, true);
    next();
  };

  const unknown = () => {
    const character = shuffledFlashCards[currentFlashcardIndex];

    // store the character at `pastCharacters`
    // state and include a false value which
    // means the user does not knows this hiragana
    storePastCharacter(character, false);
    next();
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
    if (currentFlashcardIndex + 1 == shuffledFlashCards.length) return;
    let nextIndex = currentFlashcardIndex + 1;
    setCurrentFlashcardIndex(nextIndex);
    setFlipped(false);
  }

  return (
    <>
      <main className="flex justify-center p-6">
        <div className="  py-2 w-[880px] flex flex-col items-start ">
          {/* header */}
          <div className="mb-6 w-full px-4 py-2 border-b border-gray-200 flex items-center gap-8">
            <img width="90" src="/public/nihongo.png" alt="" />

            <div>
              <h4 className="font-semibold">
                ひらがな<small className="font-light">(hiragana)</small>{" "}
                Flashcards
              </h4>
              <p className="font-medium text-gray-600">
                ひらがなのれんしゅうへようこそ!{" "}
                <small className="font-light">
                  (Welcome to hiragana practice!)
                </small>
              </p>
            </div>
          </div>
          {/* end header */}

          {/* exercises links */}

          <div className="mb-6 flex gap-2 items-center">
            <button className="bg-[#4CAF50] text-white px-4 py-1 rounded-xs">
              Flashcards
            </button>
            <button className="bg-[#4CAF50] text-white px-4 py-1 rounded-xs">
              Reading Practice
            </button>
          </div>

          {/* end exercises links */}

          <div className="w-full flex flex-col items-center justify-center">
            <div
              className={`relative  border  ${flipped ? "border-amber-500  border-2" : "border-slate-400 "}  text-black  hover:shadow-inner transition-all duration-100 w-[300px] h-[300px] flex items-center justify-center rounded-sm p-2 `}
            >
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

              <button
                onClick={() => setFlipped(!flipped)}
                className="cursor-pointer absolute px-2 rounded-tl-sm right-0 bottom-0 text-sm bg-amber-100 hover:bg-amber-200 transition-all duration-100 text-gray-900 hover:text-black"
              >
                flip
              </button>
            </div>
            <small className="mt-2 font-bold">
              {currentFlashcardIndex + 1}/
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
                  <span className="font-bold text-xs">
                    {" "}
                    ({unknownsLength}){" "}
                  </span>
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

          <div className="border border-slate-200 rounded-sm p-2 w-full flex justify-center max-h-[500px] overflow-y-scroll">
            <table className="w-100 ">
              <tbody className="border border-gray-200">
                <tr className="p-2 bg-green-100 ">
                  <th className="font-extralight px-4 py-2 text-sm">
                    Hiragana
                  </th>
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
                        {isKnown ? "✔️" : "❌"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
