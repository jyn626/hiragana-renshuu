import { useEffect, useEffectEvent, useState } from "react";
import Header from "../components/common/Header";
import Page from "../components/common/Page";
import { useFetcher } from "react-router-dom";

function ReadingPractice() {
  // const INITIAL_TIMER = 30;
  // const [timer, setTimer] = useState(INITIAL_TIMER);
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResultModal, setResultShowModal] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledSentences, setShuffledSentences] = useState([]);
  const [start, setStart] = useState(false);
  // const [isTimesUp, setIsTimesUp] = useState(false);
  const sentences = [
    {
      hiragana: "わたしはねこです",
      answer: "wa ta shi wa ne ko de su",
      romaji: "watashi wa neko desu.",
    },
    {
      hiragana: "これはほんです",
      answer: "ko re wa ho n de su",
      romaji: "kore wa hon desu.",
    },
    {
      hiragana: "それはいぬです",
      answer: "so re wa i nu de su",
      romaji: "sore wa inu desu.",
    },
    {
      hiragana: "わたしはがくせいです",
      answer: "wa ta shi wa ga ku se i de su",
      romaji: "watashi wa gakusei desu.",
    },
    {
      hiragana: "ねこがいます",
      answer: "ne ko ga i ma su",
      romaji: "neko ga imasu.",
    },
    {
      hiragana: "いぬがいます",
      answer: "i nu ga i ma su",
      romaji: "inu ga imasu.",
    },
    {
      hiragana: "わたしはみずをのみます",
      answer: "wa ta shi wa mi zu o no mi ma su",
      romaji: "watashi wa mizu o nomimasu.",
    },
    {
      hiragana: "ごはんをたべます",
      answer: "go ha n o ta be ma su",
      romaji: "gohan o tabemasu.",
    },
    {
      hiragana: "ともだちがきます",
      answer: "to mo da chi ga ki ma su",
      romaji: "tomodachi ga kimasu.",
    },
    {
      hiragana: "わたしはいえにいきます",
      answer: "wa ta shi wa i e ni i ki ma su",
      romaji: "watashi wa ie ni ikimasu.",
    },
    {
      hiragana: "ねこはかわいいです",
      answer: "ne ko wa ka wa i i de su",
      romaji: "neko wa kawaii desu.",
    },
    {
      hiragana: "いぬはおおきいです",
      answer: "i nu wa o o ki i de su",
      romaji: "inu wa ookii desu.",
    },
    {
      hiragana: "わたしはほんをよみます",
      answer: "wa ta shi wa ho n o yo mi ma su",
      romaji: "watashi wa hon o yomimasu.",
    },
    {
      hiragana: "みずをのみます",
      answer: "mi zu o no mi ma su",
      romaji: "mizu o nomimasu.",
    },
    {
      hiragana: "ともだちとあそびます",
      answer: "to mo da chi to a so bi ma su",
      romaji: "tomodachi to asobimasu.",
    },
    {
      hiragana: "わたしはにほんごをべんきょうします",
      answer: "wa ta shi wa ni ho n go o be n ki yo u shi ma su",
      romaji: "watashi wa nihongo o benkyou shimasu.",
    },
  ];

  // useEffect(() => {
  //   console.log("answer", answers);
  // }, [answers]);

  // // handle time's up
  // useEffect(() => {
  //   if (timer == 0) {
  //     setIsTimesUp(true);
  //     setReveal(true);
  //   }
  // }, [timer]);

  // useEffect(() => {
  //   if (!start || isTimesUp) {
  //     return;
  //   }
  //   const interval = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [start]);

  const checkAnswer = () => {
    const filterWhiteSpaces = answers.map((str) => {
      if (!str) {
        return;
      }
      return str.replace(/\s+/g, "");
    });

    const answer = filterWhiteSpaces.join(" ");

    const isCorrect = shuffledSentences[currentIndex].answer == answer;
    console.log(isCorrect);
    if (isCorrect) {
      setResultShowModal(true);
      setIsCorrect(true);
      setAnswers([]);
    } else {
      setResultShowModal(true);
      setIsCorrect(false);
    }
  };

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

  useEffect(() => {
    const shuffled = shuffle([...sentences]);
    setShuffledSentences(shuffled);
  }, []);

  useEffect(() => {
    const firstInput = document.querySelector('input[type="text"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, [currentIndex, start]);

  function restart() {
    setAnswers([]);
    // setIsTimesUp(false);
    // setTimer(INITIAL_TIMER);
    setReveal(false);
    const shuffled = shuffle([...sentences]);
    setShuffledSentences(shuffled);
    setCurrentIndex(0);
  }

  function next() {
    setResultShowModal(false);
    setIsCorrect(false);
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <>
      <Page>
        <Header></Header>
        <div
          className={`${showResultModal ? "" : "hidden"} shadow-inner  w-[600px] bg-slate-50/80 p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col`}
        >
          <div className="flex flex-row gap-4 items-center">
            <p className="text-blue-800  font-bold">
              {isCorrect ? (
                <>
                  {" "}
                  せかい{" "}
                  <span className="font-extralight text-xs">(correct)</span>
                </>
              ) : (
                <>
                  {" "}
                  まちがい{" "}
                  <span className="font-extralight text-xs">(mistake)</span>
                </>
              )}
            </p>
            <img
              width={`${isCorrect ? "200" : "150"}`}
              src={`${isCorrect ? "/pose_peace_sign_woman.png" : "ahiruguchi_woman.png"}`}
              alt=""
            />
          </div>
          <button
            onClick={next}
            className="cursor-pointer  bg-[#4CAF50]/80 hover:bg-[#4CAF50] text-white font-light text-sm px-2 "
          >
            Next
          </button>
        </div>
        {/* {isTimesUp && (
              <>
                <div className="mb-4  flex gap-4 justify-between border border-slate-50 p-2 w-full">
                  <div className="flex gap-4">
                    <h4 className="font-bold">Times Up!</h4>
                    <p className="font-extralight">Score: 12</p>
                    <p className="font-extralight">Highest: 40</p>
                  </div>
                  <div className="flex gap-4">
                    <span className=" bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-white px-4 text-sm py-1 cursor-pointer ">
                      Review
                    </span>
                    <span
                      onClick={restart}
                      className="bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-white px-4 text-sm py-1 cursor-pointer"
                    >
                      Restart
                    </span>
                  </div>
                </div>
              </>
            )} */}

        {/* <div className="mb-12">
              <span className="text-lg ">Timer: {timer}s</span>
              <span>00:30</span>
            </div> */}
        <div className="flex items-center gap-4 mb-4">
          <img width="100" src="/talk6_pink_woman.png" alt="" />

          <p className="text-gray-600 font-light text-sm">
            Here, you will be translating hiragana characters to romaji.
            <span className="text-sm block text-blue-400">
              ここでは、ひらがなをローマじにほんやくします。
            </span>
          </p>
        </div>

        <div className="p-2 border border-amber-200  w-full text-center">
          <h1
            className={`  ${reveal ? "font-ligh text-4xl" : "font-bold text-6xl "}`}
          >
            {reveal
              ? shuffledSentences[currentIndex]?.romaji
              : shuffledSentences[currentIndex]?.hiragana}
          </h1>
        </div>
        {/* <small className="mt-2">Write the romaji</small> */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 w-full">
          {shuffledSentences[currentIndex]?.answer
            .split(" ")
            .map((answer, index) => (
              <input
                key={`${currentIndex}-${index}`}
                type="text"
                disabled={false}
                maxLength={3}
                value={reveal ? answer : (answers[index] ?? "")}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                // className={`px-2 w-[50px] border border-gray-400 outline-amber-400 ${isTimesUp ? "bg-gray-200 text-gray-500 opacity-60" : ""}`}
                className={`px-2 w-[50px] border border-gray-400 outline-amber-400 ${false ? "bg-gray-200 text-gray-500 opacity-60" : ""}`}
              />
            ))}
        </div>

        <div className="mt-6 w-full flex justify-center gap-4">
          <button
            onClick={(e) => setReveal(!reveal)}
            disabled={false}
            className={`cursor-pointer bg-amber-500/80 hover:bg-amber-500  text-center text-white px-2 text-xs px-6 py-2`}
          >
            Reveal
          </button>

          <button
            onClick={checkAnswer}
            disabled={false}
            className={`cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-center text-white px-2 text-sm px-6 py-2 text-xs`}
          >
            Attempt
          </button>
        </div>
      </Page>
    </>
  );
}

export default ReadingPractice;
