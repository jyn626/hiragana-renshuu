import { useState } from "react";
import "./App.css";

function App() {
  const flashcards = [
    { id: 1, hiragana: "あ", answer: "a" },
    { id: 2, hiragana: "い", answer: "i" },
    { id: 3, hiragana: "う", answer: "u" },
    { id: 4, hiragana: "え", answer: "e" },
    { id: 5, hiragana: "お", answer: "o" },

    { id: 6, hiragana: "か", answer: "ka" },
    { id: 7, hiragana: "き", answer: "ki" },
    { id: 8, hiragana: "く", answer: "ku" },
    { id: 9, hiragana: "け", answer: "ke" },
    { id: 10, hiragana: "こ", answer: "ko" },

    { id: 11, hiragana: "さ", answer: "sa" },
    { id: 12, hiragana: "し", answer: "shi" },
    { id: 13, hiragana: "す", answer: "su" },
    { id: 14, hiragana: "せ", answer: "se" },
    { id: 15, hiragana: "そ", answer: "so" },

    { id: 16, hiragana: "た", answer: "ta" },
    { id: 17, hiragana: "ち", answer: "chi" },
    { id: 18, hiragana: "つ", answer: "tsu" },
    { id: 19, hiragana: "て", answer: "te" },
    { id: 20, hiragana: "と", answer: "to" },

    { id: 21, hiragana: "な", answer: "na" },
    { id: 22, hiragana: "に", answer: "ni" },
    { id: 23, hiragana: "ぬ", answer: "nu" },
    { id: 24, hiragana: "ね", answer: "ne" },
    { id: 25, hiragana: "の", answer: "no" },

    { id: 26, hiragana: "は", answer: "ha" },
    { id: 27, hiragana: "ひ", answer: "hi" },
    { id: 28, hiragana: "ふ", answer: "fu" },
    { id: 29, hiragana: "へ", answer: "he" },
    { id: 30, hiragana: "ほ", answer: "ho" },

    { id: 31, hiragana: "ま", answer: "ma" },
    { id: 32, hiragana: "み", answer: "mi" },
    { id: 33, hiragana: "む", answer: "mu" },
    { id: 34, hiragana: "め", answer: "me" },
    { id: 35, hiragana: "も", answer: "mo" },

    { id: 36, hiragana: "や", answer: "ya" },
    { id: 37, hiragana: "ゆ", answer: "yu" },
    { id: 38, hiragana: "よ", answer: "yo" },

    { id: 39, hiragana: "ら", answer: "ra" },
    { id: 40, hiragana: "り", answer: "ri" },
    { id: 41, hiragana: "る", answer: "ru" },
    { id: 42, hiragana: "れ", answer: "re" },
    { id: 43, hiragana: "ろ", answer: "ro" },

    { id: 44, hiragana: "わ", answer: "wa" },
    { id: 45, hiragana: "を", answer: "wo" },
    { id: 46, hiragana: "ん", answer: "n" },

    // Dakuten
    { id: 47, hiragana: "が", answer: "ga" },
    { id: 48, hiragana: "ぎ", answer: "gi" },
    { id: 49, hiragana: "ぐ", answer: "gu" },
    { id: 50, hiragana: "げ", answer: "ge" },
    { id: 51, hiragana: "ご", answer: "go" },

    { id: 52, hiragana: "ざ", answer: "za" },
    { id: 53, hiragana: "じ", answer: "ji" },
    { id: 54, hiragana: "ず", answer: "zu" },
    { id: 55, hiragana: "ぜ", answer: "ze" },
    { id: 56, hiragana: "ぞ", answer: "zo" },

    { id: 57, hiragana: "だ", answer: "da" },
    { id: 58, hiragana: "ぢ", answer: "ji" },
    { id: 59, hiragana: "づ", answer: "zu" },
    { id: 60, hiragana: "で", answer: "de" },
    { id: 61, hiragana: "ど", answer: "do" },

    { id: 62, hiragana: "ば", answer: "ba" },
    { id: 63, hiragana: "び", answer: "bi" },
    { id: 64, hiragana: "ぶ", answer: "bu" },
    { id: 65, hiragana: "べ", answer: "be" },
    { id: 66, hiragana: "ぼ", answer: "bo" },

    // Handakuten
    { id: 67, hiragana: "ぱ", answer: "pa" },
    { id: 68, hiragana: "ぴ", answer: "pi" },
    { id: 69, hiragana: "ぷ", answer: "pu" },
    { id: 70, hiragana: "ぺ", answer: "pe" },
    { id: 71, hiragana: "ぽ", answer: "po" },
  ];

  const [flipped, setFlipped] = useState(false);
  const [flashcardIndex, setflashcardIndex] = useState(0);

  const nextFlashcard = () => {
    let nextIndex = flashcardIndex + 1;

    if (nextIndex >= flashcards.length) return;

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
              className={`relative  border  ${flipped ? "border-amber-500  border-2" : "border-slate-400 "}  text-black  hover:shadow-inner transition-all duration-100 w-[300px] h-fit flex items-center justify-center rounded-sm p-2 `}
            >
              <p className="text-6xl text-center hover:scale-110 transition-all duration-150">
                {flipped ? (
                  flashcards[flashcardIndex].answer
                ) : (
                  <span className="font-bolder">
                    {flashcards[flashcardIndex].hiragana}
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
            <div className="flex gap-4 mt-2">
              <button
                onClick={prevFlashcard}
                className="cursor-pointer bg-green-600 text-center text-slate-100 px-2 text-sm rounded-sm"
              >
                prev
              </button>
              <button
                onClick={nextFlashcard}
                className="cursor-pointer bg-blue-400 text-center text-slate-100 px-2 text-sm rounded-sm"
              >
                next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
