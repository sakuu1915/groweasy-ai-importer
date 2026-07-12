"use client";

import { Sparkles, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-8 text-white shadow-2xl lg:p-14">
      {/* Background Blur */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
            <Sparkles size={16} className="mr-2 text-yellow-300" />
            AI Powered CRM Import
          </div>

          <h1 className="text-4xl font-extrabold leading-tight lg:text-6xl">
            Import Any CSV Into Your CRM
          </h1>

          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Upload any CRM export, Facebook Leads, Google Ads, Excel, or custom
            CSV. Our AI automatically maps fields and converts everything into
            the GrowEasy CRM format.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-xl bg-white text-blue-700 hover:bg-slate-100"
            >
              Start Importing
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <Database className="mb-4 text-cyan-300" size={36} />
            <h3 className="text-xl font-bold">Smart Mapping</h3>
            <p className="mt-2 text-blue-100">
              Automatically detects column names from any CRM or spreadsheet.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <ShieldCheck className="mb-4 text-green-300" size={36} />
            <h3 className="text-xl font-bold">Safe Validation</h3>
            <p className="mt-2 text-blue-100">
              Invalid rows are skipped while valid CRM records are preserved.
            </p>
          </div>

          <div className="col-span-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">AI Status</p>
                <h3 className="mt-2 text-3xl font-bold">Ready</h3>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-green-400"></span>
                <span className="font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}