import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Page from "../components/common/Page";

function ReadingPractice() {
  const [timer, setTimer] = useState(30);

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
          {"わたしはねこです".split("").map(() => (
            <input
              type="text"
              maxLength={3}
              className="px-2 w-[50px] border border-gray-400  outline-amber-400 "
            />
          ))}
        </div>

        <div className="mt-6 w-full flex justify-center gap-4">
          <button className=" cursor-pointer bg-red-500/80 hover:bg-red-600  text-center text-white px-2 text-sm  w-[200px] h-[77px]">
            Reveal
          </button>

          <button className=" cursor-pointer bg-[#4CAF50]/80 hover:bg-[#4CAF50]  text-center text-white px-2 text-sm  w-[200px] h-[77px]">
            Next
          </button>
        </div>
      </Page>
    </>
  );
}

export default ReadingPractice;
