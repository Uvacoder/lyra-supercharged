import { useMemo } from "react";
import { titleCase } from "../../lib/utils";

export default function ResultsTable({ results, matches, ...props }) {
  const headers = useMemo(() => {
    let largestMatch;
    const headers = [];

    if (matches && matches.length > 0) {
      largestMatch = matches.sort((a, b) => Object.keys(b) - Object.keys(a))[0];
      for (const key of Object.keys(largestMatch)) {
        headers.push(key);
      }
    }

    // now remove match keys from hit keys
    if (results && results?.hits?.length > 0) {
      const {
        hits: [result],
      } = results;

      const resultHeaders = Object.keys(result).filter((resultKey) => !Object.keys(largestMatch).some((matchKey) => matchKey === resultKey));

      for (const key of resultHeaders) {
        headers.push(key);
      }
    }

    return headers;
  }, [results, matches]);

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs bg-gray-700 text-gray-50">
            <tr>
              {headers.length > 0 &&
                headers.map((header, key) => (
                  <th scope="col" className="px-6 py-3 text-center" key={`column-${key}`}>
                    {titleCase(header)}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {results?.hits?.length > 0 &&
              results.hits.map((hit) => (
                <tr className="bg-gray-800 border-gray-700 hover:bg-gray-600" key={hit.id}>
                  <th scope="row" className="px-6 py-4 text-white whitespace-nowrap">
                    {hit["id"]}
                  </th>
                  {headers.map(
                    (header, index) =>
                      header !== "id" && (
                        <td className="px-6 py-4" key={`body-column-${index}`}>
                          {hit[header]}
                        </td>
                      )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
