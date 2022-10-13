import { useRef, useState, useMemo, useEffect } from "react";
import { CrossIcon, MagnifyingGlassIcon } from "../icons";
import Input from "./input";

export default function SearchInput({ autofocus = false, properties = [], callback, actionCallback }) {
  const inputRef = useRef(null);
  const [term, setTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search for something...");

  const isValidTerm = useMemo(() => term.length > 0, [term]);

  useEffect(() => {
    if (isValidTerm) {
      if (callback) callback.call(this, term);
    }
  }, [callback, isValidTerm, term]);

  useEffect(() => {
    const interval = setInterval(() => {
      // pick a random property
      const randomProperty = properties[Math.floor(Math.random() * properties.length)];
      setPlaceholder(`Search for "${randomProperty}"...`);
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Input
        ref={inputRef}
        value={term}
        autofocus={autofocus}
        placeholder={placeholder}
        onChange={({ target: { value } }) => setTerm(value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        IconLeft={() => <MagnifyingGlassIcon className="w-6 h-6 text-black" />}
        IconRight={() =>
          term.length > 0 && (
            <button
              onMouseDown={() => {
                if (actionCallback) actionCallback()?.call(this);

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
