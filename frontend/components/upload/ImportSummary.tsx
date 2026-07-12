"use client";

import {
  CheckCircle2,
  XCircle,
  Database,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImportResponse } from "@/types/result";

interface Props {
  result: ImportResponse;
  totalRows: number;
}

export default function ImportSummary({
  result,
  totalRows,
}: Props) {
  const successRate =
    totalRows === 0
      ? 0
      : Math.round((result.totalImported / totalRows) * 100);

  const cards = [
    {
      title: "Total Rows",
      value: totalRows,
      icon: Database,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Imported",
      value: result.totalImported,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Skipped",
      value: result.totalSkipped,
      icon: XCircle,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="group overflow-hidden rounded-3xl border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-4xl font-bold text-slate-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-4 text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>
            </div>

            <div className="mt-6 h-2 rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                style={{
                  width:
                    card.title === "Success Rate"
                      ? `${successRate}%`
                      : "100%",
                }}
              />
            </div>
          </Card>
        );
      })}
    </section>
  );
}