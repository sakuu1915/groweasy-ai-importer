"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import StatsCards from "@/components/dashboard/StatsCards";
import UploadCard from "@/components/upload/UploadCard";
import ResultTable from "@/components/table/ResultTable";

import { ImportResponse } from "@/types/result";

export default function Home() {
  const [stats, setStats] = useState({
    totalRows: 0,
    imported: 0,
    skipped: 0,
    status: "Waiting",
  });

  const [result, setResult] =
    useState<ImportResponse | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Dashboard */}

        <section id="dashboard">
          <Hero />

          <div className="mt-10">
            <StatsCards stats={stats} />
          </div>
        </section>

        {/* Upload */}

        <section
          id="upload"
          className="mt-12"
        >
          <UploadCard
            stats={stats}
            setStats={setStats}
            setResult={setResult}
          />
        </section>

        {/* Results */}

        <section
          id="results"
          className="mt-16"
        >
          {result && (
            <>
              <div className="mb-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl bg-green-50 p-6 shadow">

                  <h3 className="text-sm text-gray-500">
                    Imported
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-green-600">
                    {result.totalImported}
                  </p>

                </div>

                <div className="rounded-2xl bg-red-50 p-6 shadow">

                  <h3 className="text-sm text-gray-500">
                    Skipped
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-red-600">
                    {result.totalSkipped}
                  </p>

                </div>

              </div>

              <ResultTable
                data={result.records}
              />
            </>
          )}
        </section>

      </div>

    </main>
  );
}