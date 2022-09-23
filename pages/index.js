import { formatNanoseconds, search } from "@lyrasearch/lyra";
import { impact } from "@mateonunez/lyra-impact";
import Head from "next/head";
import { createRef, useEffect, useMemo, useState } from "react";
import { isValidUrl } from "../lib/utils";

export const fetchers = {
  rest: "rest",
  graphql: "graphql",
};

export default function Home() {
  const inputRef = createRef();

  const [fetcher, setFetcher] = useState(fetchers.rest);
  const [endpoint, setEndpoint] = useState("");
  const [property, setProperty] = useState("");
  const [lyra, setLyra] = useState(null);
  const [schema, setSchema] = useState(null);
  const [docs, setDocs] = useState({});
  const [schemaIsVisible, setSchemaIsVisible] = useState(false);
  const [documentsAreVisible, setDocumentsAreVisible] = useState(false);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidEndpoint = useMemo(() => isValidUrl(endpoint), [endpoint]);

  const handleSubmit = (fetcher, property, endpoint) => {
    setLoading(true);
    setError(null);

    if (!endpoint) throw new Error("Endpoint is required");

    impact(endpoint, {
      fetch: {
        mode: "no-cors",
        fetcher,
        property,
        ...(fetcher === fetchers.graphql && { query }),
      },
    })
      .then((lyra) => {
        setLyra(lyra);
        setSchema(lyra.schema);
        setDocs(lyra.docs);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isValidEndpoint) {
      if (fetcher === fetchers.graphql && !query) {
        setError(new Error("Query is required"));
      }

      handleSubmit(fetcher, property, endpoint);
    } else if (endpoint && !isValidEndpoint) {
      setError(new Error("Endpoint is not a valid URL"));
    } else {
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, property, query]);

  useEffect(() => {
    if (term) {
      const results = search(lyra, {
        term,
      });

      setResults(results);
    }
  }, [lyra, term]);

  // useEffect(() => {
  //   const { current } = inputRef;
  //   if (current && isValidEndpoint) current.focus();
  // }, [inputRef, isValidEndpoint]);

  return (
    <div className="container">
      <Head>
        <title>Lyra Impact supercharged 🌍☄️️</title>
        <meta name="description" content="lyra-impact supercharged" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen mx-auto mt-10">
        <h1 className="text-xl font-bold lg:text-4xl">
          Lyra Impact supercharged 🌍☄️️
        </h1>

        {/* Fetcher */}
        <div className="p-3 mt-10">
          <label>Fetcher</label>
          <div className="relative">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
            </div>

            <select
              value={fetcher}
              onChange={(e) => setFetcher(e.target.value)}
              className="pl-10"
            >
              {Object.entries(fetchers).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Endpoint */}
        <div className="p-3">
          <label>Endpoint</label>
          <div className="relative">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            <input
              className="pl-10"
              type="text"
              placeholder="Endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              required
            />
          </div>
        </div>

        {/* GraphQL query */}
        {fetcher === "graphql" && (
          <div className="p-3">
            <label>GraphQL query</label>
            <div className="relative">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>

              <textarea
                placeholder="GraphQL query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                rows="5"
              />
            </div>
          </div>
        )}

        {/* Property */}
        <div className="p-3">
          <label>Property</label>
          <div className="relative">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>

            <input
              className="pl-10"
              type="text"
              placeholder="Property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          // Loading spinner
          <div className="flex justify-center mt-10">
            <svg
              className="w-10 h-10 text-gray-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
              ></path>
            </svg>
          </div>
        )}

        {!loading && (
          <>
            {/* Schema */}
            {schema && (
              <div className="container p-3">
                <h3 className="text-bold">Lyra&apos;s schema created</h3>

                {/* Show the schema */}
                <div className="flex py-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setSchemaIsVisible(!schemaIsVisible)}
                  >
                    {schemaIsVisible ? "Hide" : "Show"} schema
                  </button>
                </div>

                {/* Schema created */}
                {schemaIsVisible && (
                  <div className="flex flex-col">
                    <code>
                      <pre>{JSON.stringify(schema, null, 2)}</pre>
                    </code>
                  </div>
                )}
              </div>
            )}

            {/* Docs */}
            {Object.keys(docs).length > 0 && (
              <div className="container p-3">
                <h3 className="text-bold">
                  Lyra&apos;s docs inserted{" "}
                  <span className="font-mono">
                    ({Object.keys(docs).length})
                  </span>
                </h3>

                {/* Show the docs */}
                <div className="flex py-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setDocumentsAreVisible(!documentsAreVisible)}
                  >
                    {documentsAreVisible ? "Hide" : "Show"} docs
                  </button>
                </div>

                {/* Docs created */}
                {documentsAreVisible && (
                  <div className="flex flex-col">
                    <code>
                      <pre>{JSON.stringify(docs, null, 2)}</pre>
                    </code>
                  </div>
                )}
              </div>
            )}

            {/* Term */}
            {schema && Object.keys(docs).length > 0 && (
              <div className="p-3">
                <label>Term</label>
                <div className="relative">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>

                  <input
                    ref={inputRef}
                    className="pl-10"
                    type="text"
                    placeholder="Search a term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="container py-3">
                <p>
                  Elapsed time:{" "}
                  <span className="text-bold">
                    {formatNanoseconds(results.elapsed)}
                  </span>
                </p>

                <p>
                  Total count:{" "}
                  <span className="text-bold">{results.count}</span>
                </p>

                {/* Results */}
                {results?.hits?.length > 0 &&
                  results?.hits.map((hit) => (
                    <div
                      className="flex flex-col p-3 my-5 overflow-hidden rounded shadow-lg full-width"
                      key={hit.id}
                    >
                      {Object.keys(hit).map((_key) => (
                        <div className="flex flex-row items-center" key={_key}>
                          <span className="font-bold">{_key}</span>
                          <div className="pl-2">
                            {typeof hit[_key] === "object"
                              ? JSON.stringify(hit[_key], null, 2)
                              : hit[_key]}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}

            {/* Show errors */}
            {error && (
              <div className="container p-3">
                <div className="flex flex-col">
                  <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    <span className="font-medium">Error!</span>
                    <span className="block">{error.message}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer  */}
      <footer className="bottom-0 py-5">
        Created by{" "}
        <a
          href="https://github.com/mateonunez"
          target="_blank"
          rel="noopener noreferrer"
          alt="Mateo Nunez on Github"
        >
          @mateonunez
        </a>{" "}
        using{" "}
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
        ,{" "}
        <a href="https://lyrajs.io" target="_blank" rel="noopener noreferrer">
          Lyra
        </a>
        ,{" "}
        <a
          href="https://github.com/mateonunez/lyra-impact"
          target="_blank"
          rel="oopener noreferrer"
        >
          lyra-impact
        </a>{" "}
        and ❤️
      </footer>
    </div>
  );
}
