import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOpeningBySlug, openings } from "@/data/openings";
import { OpeningDetailClient } from "@/components/opening/OpeningDetailClient";

export function generateStaticParams() {
  return openings.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const opening = getOpeningBySlug(params.slug);
  if (!opening) return {};
  return {
    title: opening.name,
    description: opening.intro,
  };
}

export default function OpeningPage({ params }: { params: { slug: string } }) {
  const opening = getOpeningBySlug(params.slug);
  if (!opening) notFound();

  return <OpeningDetailClient opening={opening} />;
}
