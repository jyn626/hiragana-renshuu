import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  });

  return (
    <>
      {" "}
      <div className="mb-6 w-full px-4 py-2 border-b border-gray-200 flex justify-between  items-center gap-8">
        <div className="flex gap-2 items-center">
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

        <div className="flex gap-2 flex-col">
          <small
            className={`font-light ${path == "/" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/">Flashcards</Link>
          </small>
          <small
            className={`font-light ${path == "/reading" ? "text-blue-600 underline" : "text-blue-400"} cursor-pointer hover:underline `}
          >
            <Link to="/reading">Reading Practice</Link>
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
