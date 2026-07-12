"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

interface Props {
  data: any[];
}

const PAGE_SIZE = 10;

export default function ResultTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const currentRows = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const badgeColor = (status: string) => {
    switch (status) {
      case "GOOD_LEAD_FOLLOW_UP":
        return "bg-green-100 text-green-700";

      case "SALE_DONE":
        return "bg-blue-100 text-blue-700";

      case "BAD_LEAD":
        return "bg-red-100 text-red-700";

      case "DID_NOT_CONNECT":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="mt-10 rounded-3xl border bg-white shadow-xl">

      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            AI Parsed Results
          </h2>

          <p className="text-sm text-slate-500">
            {filteredData.length} Records
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-100">

            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap border-b px-4 py-3 text-left text-sm font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {currentRows.map((row, index) => (
              <tr
                key={index}
                className="transition hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="whitespace-nowrap border-b px-4 py-3 text-sm"
                  >
                    {column === "crm_status" ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(
                          row[column]
                        )}`}
                      >
                        {row[column]}
                      </span>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>
      </div>

      <div className="flex items-center justify-between border-t p-6">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <p className="text-sm">
          Page {page} of {totalPages}
        </p>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}