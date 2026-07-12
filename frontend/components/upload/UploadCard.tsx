"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import Papa from "papaparse";
import { CsvRow } from "@/types/csv";
import PreviewTable from "../table/PreviewTable";
import LoadingProgress from "../common/LoadingProgress";
import ResultTable from "../table/ResultTable";
import api from "@/lib/api";
import { ImportResponse } from "@/types/result";
import { toast } from "sonner";
import ImportSummary from "./ImportSummary";

interface Stats {
  totalRows: number;
  imported: number;
  skipped: number;
  status: string;
}

interface Props {
  stats: Stats;

  setStats: React.Dispatch<
    React.SetStateAction<Stats>
  >;

  setResult: React.Dispatch<
    React.SetStateAction<ImportResponse | null>
  >;
}

export default function UploadCard({
  stats,
  setStats,
  setResult,
}: Props)  {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CsvRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      setSelectedFile(file);
      toast.info(`${file.name} selected`);
      setResult(null);
      setPreviewData([]);
      setLoading(false);
      setProgress(0);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const rows = result.data as CsvRow[];

          setPreviewData(rows);

          setStats({
            totalRows: rows.length,
            imported: 0,
            skipped: 0,
            status: "Ready",
          });
        },
      });
    },
    [setStats],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setProgress(10);

      setStats((prev) => ({
        ...prev,
        status: "Processing...",
      }));

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate upload progress
      setProgress(30);

      const response = await api.post("/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);

      // AI finished processing
      setProgress(80);

      toast.success(
        `${response.data.totalImported} records imported successfully`,
      );

      setStats({
        totalRows: previewData.length,
        imported: response.data.totalImported,
        skipped: response.data.totalSkipped,
        status: "Completed",
      });

      // Finish progress
      setProgress(100);
    } catch (error) {
      console.error(error);

      setStats((prev) => ({
        ...prev,
        status: "Failed",
      }));

      toast.error("Import Failed");
    } finally {
      // Small delay so users can see 100%
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };
  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      {/* Heading */}
      <div className="mb-5 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        🚀 AI CSV Import
      </div>

      <div className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
        <h2 className="text-4xl font-bold">Import CRM Data</h2>

        <p className="mt-3 text-blue-100">
          Upload CSV files from Facebook Leads, Google Ads, Excel, or any CRM.
          Our AI automatically maps and transforms them into the GrowEasy CRM
          format.
        </p>
      </div>

      {/* Dropzone */}

      <div
        {...getRootProps()}
        className={`group cursor-pointer rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-300

${
  isDragActive
    ? "border-blue-600 bg-blue-50 scale-[1.02]"
    : "border-slate-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
}`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={80}
          className="mx-auto mb-6 text-blue-600 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110"
        />

        <h3 className="text-2xl font-semibold">Drag & Drop CSV Here</h3>

        <p className="mt-3 text-slate-500">or click to browse</p>

        <Button
          size="lg"
          className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8"
        >
          Choose CSV
        </Button>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="font-bold text-blue-600">CSV</p>

            <p>Comma Separated</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <p className="font-bold text-green-600">Excel</p>

            <p>.xlsx Export</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <p className="font-bold text-violet-600">AI</p>

            <p>Auto Mapping</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <p className="font-bold text-orange-600">CRM</p>

            <p>GrowEasy Ready</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            Facebook Leads
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            Google Ads
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            Excel
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            CRM Export
          </span>
        </div>
      </div>

      {/* Selected File */}

      {selectedFile && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow">
          <div className="flex items-center gap-4">
            <FileSpreadsheet
              className="rounded-xl bg-white p-2 text-green-600 shadow"
              size={48}
            />

            <div>
              <h4 className="text-lg font-semibold">{selectedFile.name}</h4>

              <p className="text-sm text-slate-600">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>

            <CheckCircle2 className="ml-auto text-green-600" size={28} />
          </div>
        </div>
      )}
      {/* Preview */}
      {previewData.length > 0 && <PreviewTable data={previewData} />}

      {/* Confirm Button */}
      {previewData.length > 0 && !loading && (
        <div className="mt-8 flex justify-end">
          <Button onClick={handleImport} disabled={loading}>
            {loading ? "Importing..." : "Confirm Import"}
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-8">
          <LoadingProgress progress={progress} />
        </div>
      )}
    </Card>
  );
}
