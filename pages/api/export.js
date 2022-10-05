import {
  importInstance,
  persistToFile,
} from "@lyrasearch/plugin-data-persistence";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });

    return;
  }

  const { serializedData = null } = req.body;

  if (!serializedData) {
    res.status(400).json({
      success: false,
      message: "Missing serializedData",
    });

    return;
  }

  const lyraFromSerialized = importInstance(serializedData, "json");
  const lyraFilePath = persistToFile(lyraFromSerialized, "binary");

  const filePath = path.resolve(lyraFilePath);
  const file = fs.readFileSync(filePath, "utf8");

  // Send the file as blob
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment; filename=lyra.msp");
  res.setHeader("Content-Length", file.length);
  res.status(200).send(file);
}
