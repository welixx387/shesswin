export type AccentColor = "primary" | "gold" | "success";

export type KeyLine = {
  name: string;
  moves: string[];
  note: string;
};

export type SampleGame = {
  white: string;
  black: string;
  event: string;
  year: number;
  result: "1-0" | "0-1" | "1/2-1/2";
  moves: string[];
  note: string;
};

export type Opening = {
  slug: string;
  name: string;
  nameEn: string;
  eco: string;
  level: string;
  accent: AccentColor;
  tagline: string;
  category: "open" | "semi-open" | "closed";
  moves: string[];
  heroMoves: string[];
  intro: string;
  ideasWhite: string[];
  ideasBlack: string[];
  keyLines: KeyLine[];
  mistakes: { title: string; explanation: string }[];
  sampleGame: SampleGame;
};
