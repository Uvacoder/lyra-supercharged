import { useRef, useState, useMemo, useEffect } from "react";
import { CrossIcon, MagnifyingGlassIcon } from "../icons";
import Input from "./input";

export default function SearchInput({ autofocus = false, callback, actionCallback }) {
  const inputRef = useRef(null);
  const [term, setTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const isValidTerm = useMemo(() => term.length > 0, [term]);

  useEffect(() => {
    if (isValidTerm) {
      callback(term);
    }
  }, [callback, isValidTerm, term]);

  return (
    <>
      <Input
        ref={inputRef}
        value={term}
        autofocus={autofocus}
        placeholder="Insert a term..."
        onChange={({ target: { value } }) => setTerm(value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        IconLeft={() => <MagnifyingGlassIcon className="w-6 h-6 text-black" />}
        IconRight={() =>
          term.length > 0 && (
            <button
              onMouseDown={() => {
                if (actionCallback) actionCallback();

                setTerm("");
              }}
              title="Reset"
            >
              <CrossIcon className="w-6 h-6 text-black" />
            </button>
          )
        }
      />
    </>
  );
}
