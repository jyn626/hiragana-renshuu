import { useEffect, useState } from "react";
import "./App.css";
import { hiragana } from "./data/hiragana";
function App() {
  const [flipped, setFlipped] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [shuffledFlashCards, setShuffledFlashCards] = useState([]);
  const [knowns, setKnowns] = useState([]);
  const [unknowns, setUnknowns] = useState([]);
  const [pastCharacters, setPastCharacters] = useState([]);

  const storePastCharacter = (char, known) => {
    setPastCharacters((prev) => {
      const updated = [
        ...prev,
        {
          ...char,
          known,
        },
      ];

      console.log("kochii desuu", updated);
      return updated;
    });
  };

  const known = () => {
    // TODO: refactor laterrr
    const knownCharacter = shuffledFlashCards[currentFlashcardIndex];

    setKnowns((prev) => {
      const updated = [...prev, knownCharacter];
      console.log(updated);

      return updated;
    });

    storePastCharacter(knownCharacter, true);
    next();
  };

  useEffect(() => {
    shuffleFlashCards(hiragana);
  }, []);

  const unknown = () => {
    // TODO: refactor laterrr

    const unknownCharacter = shuffledFlashCards[currentFlashcardIndex];

    setUnknowns((prev) => {
      const updated = [...prev, unknownCharacter];
      console.log(updated);

      return updated;
    });

    storePastCharacter(unknownCharacter, false);
    next();
  };

  // function generateRandomIndex() {
  //   return Math.floor(Math.random() * hiragana.length);
  // }

  function shuffleFlashCards(array) {
    const shuffled = shuffle([...array]);
    setShuffledFlashCards(shuffled);
  }

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
        <div className="border border-slate-200  py-2 w-[880px] flex flex-col items-start ">
          <div className="mb-12 w-full px-4 py-2 border-b border-gray-200 flex items-center gap-8">
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
                    ({unknowns?.length}){" "}
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
                  <span className="font-bold text-xs">
                    {" "}
                    ({knowns?.length}){" "}
                  </span>
                </button>
                <small>わかります</small>
              </div>
            </div>
          </div>

          <div className="p-2 flex flex-row justify-around w-full">
            <table>
              <tbody className="border border-gray-200">
                <tr className="p-2 bg-red-100 ">
                  <th className="font-light px-4 py-2 text-sm">Hiragana</th>
                  <th className="font-light px-4 py-2 text-sm">Answer</th>
                </tr>
                {unknowns.map(({ hiragana, answer }) => {
                  return (
                    <tr>
                      <td className="text-center">{hiragana}</td>
                      <td className="text-center">{answer}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table>
              <tbody className="border border-gray-200">
                <tr className="p-2 bg-green-100 ">
                  <th className="font-light px-4 py-2 text-sm">Hiragana</th>
                  <th className="font-light px-4 py-2 text-sm">Answer</th>
                </tr>
                {knowns.map(({ hiragana, answer }) => {
                  return (
                    <tr>
                      <td className="text-center">{hiragana}</td>
                      <td className="text-center">{answer}</td>
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
