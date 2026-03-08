import { useState } from "react";
import "./App.css";
import { hiragana } from "./data/hiragana";
function App() {
  const [flipped, setFlipped] = useState(false);
  const [flashcardIndex, setflashcardIndex] = useState(0);

  const nextFlashcard = () => {
    let nextIndex = flashcardIndex + 1;

    if (nextIndex >= hiragana.length) return;

    setflashcardIndex(nextIndex);
    setFlipped(false);
  };

  const prevFlashcard = () => {
    let prevIndex = flashcardIndex - 1;

    if (prevIndex < 0) return;

    setflashcardIndex(prevIndex);
    setFlipped(false);
  };

  return (
    <>
      <main className=" h-[100vh] flex justify-center p-6">
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
                  hiragana[flashcardIndex].answer
                ) : (
                  <span className="font-bolder">
                    {hiragana[flashcardIndex].hiragana}
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
            {/* buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={prevFlashcard}
                className="cursor-pointer bg-[#A3D55D]/80 hover:bg-[#A3D55D] text-center  text-white px-2 text-sm w-[200px] h-[77px]"
              >
                previous card
              </button>
              <button
                onClick={nextFlashcard}
                className="cursor-pointer bg-[#457B9D]/80 hover:bg-[#457B9D] text-center text-white px-2 text-sm  w-[200px]"
              >
                next card
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
