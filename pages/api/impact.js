// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { impact } from "@mateonunez/lyra-impact";
import { formatNanoseconds, search } from "@lyrasearch/lyra";
import { fetchers } from "..";

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });

    return;
  }

  const {
    endpoint = "",
    fetcher = "rest",
    property = "",
    query = "",
    term = "",
  } = req.body;

  if (!endpoint) {
    res.status(400).json({
      success: false,
      message: "Missing endpoint",
    });

    return;
  }

  if (fetcher !== fetchers.rest && fetcher !== fetchers.graphql) {
    res.status(400).json({
      success: false,
      message: "Invalid fetcher",
    });

    return;
  }

  if (fetcher === fetchers.graphql && !query) {
    res.status(400).json({
      success: false,
      message: "Missing query",
    });

    return;
  }

  if (!term) {
    res.status(400).json({
      success: false,
      message: "Missing term",
    });

    return;
  }

  const lyra = await impact(endpoint, {
    fetch: {
      fetcher,
      property,
      mode: "no-cors",
      ...(fetcher === fetchers.graphql && { query }),
    },
  });

  const results = search(lyra, {
    term,
  });

  res.status(200).json({
    success: true,
    elapsed: formatNanoseconds(results.elapsed),
    count: results.count,
    data: results.hits,
  });
}
