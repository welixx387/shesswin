"use client";

import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { openings } from "@/data/openings";
import { OpeningCard } from "@/components/opening/OpeningCard";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = [
  { id: "all", label: "Все" },
  { id: "open", label: "Открытые" },
  { id: "semi-open", label: "Полуоткрытые" },
  { id: "closed", label: "Закрытые" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function OpeningsSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const filtered = filter === "all" ? openings : openings.filter((o) => o.category === filter);

  return (
    <section id="openings" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mb-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
          Начни с этих дебютов
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-text-secondary">
          Три классических дебюта, с которых стоит начать путь к мастерству.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mb-10 flex justify-center">
        <LayoutGroup id="opening-filters">
          <div className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-brand"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${filter === f.id ? "text-white" : "text-text-secondary"}`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((opening, i) => (
          <OpeningCard key={opening.slug} opening={opening} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-text-secondary">В этой категории пока нет дебютов.</p>
      )}
    </section>
  );
}
