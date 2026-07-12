import { Request, Response } from "express";
import fs from "fs";

import { parseCSV } from "../services/csv.service";
import { extractCRMData } from "../services/ai.service";
import { createBatches } from "../services/batch.service";
import { CRMResponseSchema } from "../utils/validators";

export const importCSV = async (
  req: Request,
  res: Response
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    const records = await parseCSV(req.file.path);

    const batches = createBatches(records, 25);

    let allRecords: any[] = [];

    for (const batch of batches) {

      const response = await extractCRMData(batch);
      console.log("AI Response:");
console.log(response);

      if (!response) {
  continue;
}

let json;

try {
  json = JSON.parse(response);
} catch {
  console.log("Invalid AI response:");
  console.log(response);

  continue;
}

const parsed = CRMResponseSchema.parse(json);

      if (parsed.records) {
        allRecords.push(...parsed.records);
      }
    }

    fs.unlinkSync(req.file.path);

    res.json({
  success: true,
  totalImported: allRecords.length,
  totalSkipped: records.length - allRecords.length,
  records: allRecords,
});
  } catch (error: any) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message || "Import failed",
  });
}
};