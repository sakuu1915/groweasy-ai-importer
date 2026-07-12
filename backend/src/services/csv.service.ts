import fs from "fs";
import Papa from "papaparse";

export async function parseCSV(filePath: string): Promise<any[]> {
  const csv = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}