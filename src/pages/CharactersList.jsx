import Page from "../components/common/Page";
import Header from "../components/common/Header";
import { hiragana } from "../data/hiragana";
import { useState } from "react";

export default function CharactersList() {
  const [selected, setSelected] = useState(null);
  const rowColors = {
    Vowels: { bg: "#fff0f3", accent: "#e63950", label: "#c0253a" },
    "K-row": { bg: "#fff7e6", accent: "#f59e0b", label: "#b45309" },
    "S-row": { bg: "#f0fdf4", accent: "#22c55e", label: "#15803d" },
    "T-row": { bg: "#eff6ff", accent: "#3b82f6", label: "#1d4ed8" },
    "N-row": { bg: "#faf5ff", accent: "#a855f7", label: "#7e22ce" },
    "H-row": { bg: "#fff1f0", accent: "#f97316", label: "#c2410c" },
    "M-row": { bg: "#f0fdfa", accent: "#14b8a6", label: "#0f766e" },
    "Y-row": { bg: "#fefce8", accent: "#eab308", label: "#854d0e" },
    "R-row": { bg: "#fdf4ff", accent: "#d946ef", label: "#a21caf" },
    "W-row": { bg: "#f0f9ff", accent: "#0ea5e9", label: "#0369a1" },
    "N (standalone)": { bg: "#f8fafc", accent: "#64748b", label: "#334155" },
  };

  // KanjiVG uses the Unicode code point as a zero-padded 5-char hex filename
  const getStrokeUrl = (character) => {
    const codePoint = character.codePointAt(0).toString(16).padStart(5, "0");
    return `https://kanjivg.tagaini.net/kanjivg/kanji/${codePoint}.svg`;
  };

  const rows = Array.from(new Set(hiragana.map((h) => h.row)));

  return (
    <>
      <Page>
        <Header></Header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 150px)",
            gap: "0.85rem",
            width: "100%",
            margin: "0 auto",
            placeContent: "center",
          }}
        >
          {hiragana.map(({ character, id, row, romaji }) => {
            const colors = rowColors[row];
            console.log(colors);
            return (
              <div
                key={id}
                onClick={() => setSelected({ character, id, row, romaji })}
                style={{
                  backgroundColor: colors.bg,
                  color: colors.label,
                  borderRadius: "2px",
                  padding: "1rem 0.75rem",
                  textAlign: "center",
                  border: `1.5px solid ${colors.accent}22`,
                }}
              >
                <h4 className="text-2xl font-medium">{character} </h4>
                <small
                  className="text-xs"
                  style={{ color: `${colors.accent}80` }}
                >
                  {romaji}
                </small>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="cursor-pointer absolute top-3 right-4 text-gray-300 hover:text-gray-500 text-xl leading-none"
              >
                ✕
              </button>

              {/* Stroke order SVG from KanjiVG */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={getStrokeUrl(selected.character)}
                  alt={`Stroke order for ${selected.character}`}
                  className="w-50  object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback if image fails */}
                <div className="w-36 h-36 border-2 border-dashed border-gray-200 rounded-xl items-center justify-center text-gray-300 text-sm hidden">
                  Not available
                </div>
              </div>

              {/* Romaji */}
              <div className="text-lg text-gray-400 tracking-widest mb-6">
                {selected.romaji}
              </div>

              {/* ID */}
              <p className="text-gray-200 text-xs font-mono mt-5">
                #{selected.id}
              </p>
            </div>
          </div>
        )}
      </Page>
    </>
  );
}
