import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  });

  return (
    <>
      <div className="mb-2 w-full border-b border-gray-200 flex flex-col  md:gap-2">
        <div className=" px-4 py-2 flex flex-col md:flex-row gap-2 items-center">
          <img width="90" src="/school_girl_lying.jpg" alt="" />
          <div className="text-center md:text-start">
            <h4 className="font-light">
              ひらがな<small className="font-light ml-2">flashcards</small>
            </h4>
            <p className="font-extralight text-gray-400">
              ひらがなのれんしゅうへようこそ!{" "}
              <small className="font-light">
                (Welcome to hiragana practice!)
              </small>
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-row bg-blue-300/20 px-6 py-1.5 border-y border-gray-200">
          <small
            className={`font-bold ${path == "/" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/">flashcards</Link>
          </small>
          <small
            className={`font-bold ${path == "/read-type" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/read-type">hiragana: read & type</Link>
          </small>

          <small
            className={`font-bold ${path == "/characters" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/characters">characters</Link>
          </small>

          <small
            className={`font-bold ${path == "/reading" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/reading">reading</Link>
          </small>
        </div>
      </div>

      {/* exercises links */}
      {/* <div className="mb-6 flex gap-2 items-center">
        <Link
          to="/"
          className="text-sm cursor-pointer bg-[#4CAF50] text-white px-4 py-1 rounded-xs"
        >
          Flashcards
        </Link>
        <Link
          to="/reading"
          className="text-sm cursor-pointer bg-[#4CAF50] text-white px-4 py-1 rounded-xs"
        >
          Reading Practice
        </Link>
      </div> */}
    </>
  );
}

export default Header;
