import { search } from "@lyrasearch/lyra";
import { impact } from "@mateonunez/lyra-impact";
import { useCallback, useState } from "react";
import ContainerImage from "../components/containers/container-image";
import { EndpointInput, SearchInput } from "../components/inputs/";
import config from "../lib/config/config.json";
import cn from "classnames";
import { match } from "@mateonunez/lyra-match";
import { ResultsTable } from "../components/tables";

export default function Homepage() {
  const [fetchingEndpoint, setFetchingEndpoint] = useState(false);
  const [lyra, setLyra] = useState(null);
  const [results, setResults] = useState([]);
  const [matches, setMatches] = useState([]);

  const endpointCallback = useCallback((endpoint, config) => {
    setFetchingEndpoint(true);

    impact("/api/forward", {
      fetch: {
        method: "POST",
        body: JSON.stringify({
          endpoint,
        }),
      },
    })
      .then((lyra) => setLyra(lyra))
      .catch((error) => {
        // handle error here, should I provide `property` input?
        console.error(error);
      })
      .finally(() => setFetchingEndpoint(false));
  }, []);

  const searchCallback = useCallback(
    (term) => {
      if (term) {
        const results = search(lyra, { term });
        const matches = match(results.hits, { term });
        setResults(results);
        setMatches(matches);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lyra]
  );

  return (
    <>
      <div className="relative z-50 flex flex-col justify-between h-full">
        {/* Title */}
        <div className="mx-auto mt-5 text-center">
          <h1 className="title">{config.appName}</h1>
        </div>

        {/* <div className="my-20 text-center">
          <h2 className="text-2xl">Quotes or something chill....</h2>
        </div> */}

        {/* Search input */}
        {lyra && (
          <div className="w-full p-10 mx-auto mt-0 md:w-2/3">
            <SearchInput autofocus callback={searchCallback} />
          </div>
        )}

        {/* Enpoint input */}
        {!lyra && (
          <div className="w-full px-10 md:m-auto md:w-2/3">
            <EndpointInput callback={endpointCallback} />
          </div>
        )}

        {/* Results */}
        <div className="w-full px-10 my-auto md:m-auto">
          <ResultsTable results={results} matches={matches} />
          {/* {results && results.hits && results.hits.length > 0 &&  />} */}
        </div>
      </div>

      <ContainerImage classNameContent="relative" src="/lyra-supercharged-dalle.tiny.png" />
    </>
  );
}
