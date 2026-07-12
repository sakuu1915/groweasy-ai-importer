"use client";

import {
  Database,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Stats {
  totalRows: number;
  imported: number;
  skipped: number;
  status: string;
}

interface Props {
  stats: Stats;
}

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Total Rows",
      value: stats.totalRows,
      icon: Database,
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "Imported",
      value: stats.imported,
      icon: CheckCircle2,
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "Skipped",
      value: stats.skipped,
      icon: XCircle,
      bg: "from-red-500 to-pink-600",
    },
    {
      title: "AI Status",
      value: stats.status,
      icon: Activity,
      bg:
        stats.status === "Completed"
          ? "from-green-500 to-green-600"
          : stats.status === "Processing..."
          ? "from-yellow-500 to-orange-500"
          : stats.status === "Failed"
          ? "from-red-500 to-red-600"
          : "from-slate-500 to-slate-700",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Background Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-5 group-hover:opacity-10`}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-4xl font-extrabold text-slate-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-br ${card.bg} p-4 text-white shadow-lg`}
              >
                <Icon size={26} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.bg}`}
                style={{
                  width:
                    card.title === "Imported"
                      ? `${stats.totalRows ? (stats.imported / stats.totalRows) * 100 : 0}%`
                      : card.title === "Skipped"
                      ? `${stats.totalRows ? (stats.skipped / stats.totalRows) * 100 : 0}%`
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