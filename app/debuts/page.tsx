import type { Metadata } from "next";
import { openings } from "@/data/openings";
import { OpeningCard } from "@/components/opening/OpeningCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Дебюты",
  description:
    "Все шахматные дебюты на ShessWin: Итальянская партия, Сицилианская защита, Ферзевый гамбит и другие.",
};

export default function DebutsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <Reveal className="mb-12 max-w-2xl">
        <h1 className="font-heading text-4xl font-extrabold text-text-primary sm:text-5xl">Все дебюты</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Выберите дебют и начните разбор теории на интерактивной доске.
        </p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {openings.map((opening, i) => (
          <OpeningCard key={opening.slug} opening={opening} index={i} />
        ))}
      </div>
    </div>
  );
}
