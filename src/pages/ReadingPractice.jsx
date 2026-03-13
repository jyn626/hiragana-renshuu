import { useEffect, useEffectEvent, useState } from "react";
import Header from "../components/common/Header";
import Page from "../components/common/Page";

function ReadingPractice() {
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [sentences, setSentences] = useState([
    {
      sentence: "わたしはねこです",
      answer: "wa ta shi wa ne ko de su",
      reveal: "watashi wa neko desu.",
    },
    {
      sentence: "これはほんです",
      answer: "ko re wa ho n de su",
      reveal: "kore wa hon desu.",
    },
    {
      sentence: "それはいぬです",
      answer: "so re wa i nu de su",
      reveal: "sore wa inu desu.",
    },
    {
      sentence: "わたしはがくせいです",
      answer: "wa ta shi wa ga ku se i de su",
      reveal: "watashi wa gakusei desu.",
    },
    {
      sentence: "ねこがいます",
      answer: "ne ko ga i ma su",
      reveal: "neko ga imasu.",
    },
    {
      sentence: "いぬがいます",
      answer: "i nu ga i ma su",
      reveal: "inu ga imasu.",
    },
    {
      sentence: "わたしはみずをのみます",
      answer: "wa ta shi wa mi zu o no mi ma su",
      reveal: "watashi wa mizu o nomimasu.",
    },
    {
      sentence: "ごはんをたべます",
      answer: "go ha n o ta be ma su",
      reveal: "gohan o tabemasu.",
    },
    {
      sentence: "ともだちがきます",
      answer: "to mo da chi ga ki ma su",
      reveal: "tomodachi ga kimasu.",
    },
    {
      sentence: "わたしはいえにいきます",
      answer: "wa ta shi wa i e ni i ki ma su",
      reveal: "watashi wa ie ni ikimasu.",
    },
    {
      sentence: "ねこはかわいいです",
      answer: "ne ko wa ka wa i i de su",
      reveal: "neko wa kawaii desu.",
    },
    {
      sentence: "いぬはおおきいです",
      answer: "i nu wa o o ki i de su",
      reveal: "inu wa ookii desu.",
    },
    {
      sentence: "わたしはほんをよみます",
      answer: "wa ta shi wa ho n o yo mi ma su",
      reveal: "watashi wa hon o yomimasu.",
    },
    {
      sentence: "みずをのみます",
      answer: "mi zu o no mi ma su",
      reveal: "mizu o nomimasu.",
    },
    {
      sentence: "ともだちとあそびます",
      answer: "to mo da chi to a so bi ma su",
      reveal: "tomodachi to asobimasu.",
    },
    {
      sentence: "わたしはにほんごをべんきょうします",
      answer: "wa ta shi wa ni ho n go o be n kyo u shi ma su",
      reveal: "watashi wa nihongo o benkyou shimasu.",
    },
  ]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

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

    const isCorrect = sentences[0].answer == answer;
    console.log(isCorrect);
    if (isCorrect) {
      alert("Tadashii desuu");
    } else {
      alert("Machigai desuu");
    }
  };

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
            {reveal ? sentences[0].reveal : sentences[0].sentence}
          </h1>
        </div>
        <small className="mt-2">Input Romaji here</small>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 w-full">
          {sentences[0].sentence.split("").map((_, index) => (
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
