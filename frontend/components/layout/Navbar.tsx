"use client";

import { BrainCircuit, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    id: "dashboard",
  },
  {
    title: "Upload",
    id: "upload",
  },
  {
    title: "Results",
    id: "results",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (!section) return;

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {
          setActive(item.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div
          onClick={() => scrollTo("dashboard")}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-3 text-white shadow-lg">
            <BrainCircuit size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              GrowEasy
            </h2>

            <p className="text-xs text-slate-500">
              AI CSV Importer
            </p>
          </div>
        </div>

        {/* Desktop */}

        <div className="hidden items-center gap-8 md:flex">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative font-medium transition

              ${
                active === item.id
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.title}

              {active === item.id && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-blue-600" />
              )}
            </button>
          ))}

          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <span className="text-sm font-medium text-green-700">
              AI Online
            </span>

          </div>

          <Button className="rounded-xl">
            Documentation
          </Button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t bg-white md:hidden">

          <div className="space-y-4 p-6">

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left font-medium

                ${
                  active === item.id
                    ? "text-blue-600"
                    : "text-slate-700"
                }`}
              >
                {item.title}
              </button>
            ))}

            <Button className="w-full">
              Documentation
            </Button>

          </div>

        </div>
      )}

    </header>
  );
}