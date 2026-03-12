import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      {" "}
      <div className="mb-6 w-full px-4 py-2 border-b border-gray-200 flex items-center gap-8">
        <img width="90" src="/public/nihongo.png" alt="" />

        <div>
          <h4 className="font-semibold">
            ひらがな<small className="font-light">(hiragana)</small> Flashcards
          </h4>
          <p className="font-medium text-gray-600">
            ひらがなのれんしゅうへようこそ!{" "}
            <small className="font-light">
              (Welcome to hiragana practice!)
            </small>
          </p>
        </div>
      </div>
      {/* exercises links */}
      <div className="mb-6 flex gap-2 items-center">
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
      </div>
    </>
  );
}

export default Header;
