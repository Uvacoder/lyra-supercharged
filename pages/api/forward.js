export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });

    return;
  }

  const { endpoint = "", ...options } = JSON.parse(req.body);

  if (!endpoint) {
    res.status(400).json({
      success: false,
      message: "Missing endpoint",
    });

    return;
  }

  const response = await fetch(endpoint, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...(options?.body && { body: options.body }),
  });

  const data = await response.json();

  res.status(200).json(data);
}
