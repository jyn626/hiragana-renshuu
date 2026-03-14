import { useEffect, useEffectEvent, useState } from "react";
import Header from "../components/common/Header";
import Page from "../components/common/Page";
import { useFetcher } from "react-router-dom";

function ReadingPractice() {
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledSentences, setShuffledSentences] = useState([]);
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
      answer: "wa ta shi wa ni ho n go o be n kyo u shi ma su",
      romaji: "watashi wa nihongo o benkyou shimasu.",
    },
  ];

  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);

  useEffect(() => {
    if (timer == 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      alert("Tadashii desuu");
    } else {
      alert("Machigai desuu");
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
    const shuffled = shuffle(sentences);
    setShuffledSentences(shuffled);
  }, []);

  return (
    <>
      <Page>
        <Header></Header>

        <div className="mb-12">
          <span className="text-lg ">{timer}</span>
          {/* <span>00:30</span> */}
        </div>

        <div className="p-2 border border-amber-200  w-full text-center">
          <h1 className="font-bold text-6xl">
            {reveal
              ? shuffledSentences[currentIndex]?.romaji
              : shuffledSentences[currentIndex]?.hiragana}
          </h1>
        </div>
        <small className="mt-2">Input Romaji here</small>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 w-full">
          {shuffledSentences[currentIndex]?.hiragana
            .split("")
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={3}
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="px-2 w-[50px] border border-gray-400  outline-amber-400 "
              />
            ))}
        </div>

        <div className="mt-6 w-full flex justify-center gap-4">
          <button
            onClick={(e) => setReveal(!reveal)}
            className=" cursor-pointer bg-red-500/80 hover:bg-red-600  text-center text-white px-2 text-sm  w-[200px] h-[77px]"
          >
            Reveal
          </button>

          <button
            onClick={checkAnswer}
            className=" cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-center text-white px-2 text-sm  w-[200px] h-[77px]"
          >
            Attempt
          </button>
        </div>
      </Page>
    </>
  );
}

export default ReadingPractice;
