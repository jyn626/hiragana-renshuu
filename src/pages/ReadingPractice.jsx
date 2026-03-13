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

        <div>
          <span>{timer}</span>
          {/* <span>00:30</span> */}
        </div>
      </Page>
    </>
  );
}

export default ReadingPractice;
