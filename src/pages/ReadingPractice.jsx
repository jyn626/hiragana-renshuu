import { useEffect, useEffectEvent, useState } from "react";
import Header from "../components/common/Header";
import Page from "../components/common/Page";

function ReadingPractice() {
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [sentences, setSentences] = useState([
    {
      sentence: "わたしはねこです",
      answer: "watashiwanekodesu",
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

  return (
    <>
      <Page>
        <Header></Header>

        <div className="mb-12">
          <span className="text-lg ">{timer}</span>
          {/* <span>00:30</span> */}
        </div>

        <div className="p-2 border border-amber-200  w-full text-center">
          <h1 className="font-bold text-6xl">わたしは ねこです。</h1>
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
          <button className=" cursor-pointer bg-red-500/80 hover:bg-red-600  text-center text-white px-2 text-sm  w-[200px] h-[77px]">
            Reveal
          </button>

          <button className=" cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-center text-white px-2 text-sm  w-[200px] h-[77px]">
            Attempt
          </button>
        </div>
      </Page>
    </>
  );
}

export default ReadingPractice;
