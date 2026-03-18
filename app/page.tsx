"use client";

import { useState } from "react";

type Fighter = {
  name: string;
  strength: number;
  speed: number;
  health: number;
  weapon: string;
};

const names = ["Aldric", "Borin", "Cedric", "Darian", "Edric"];
const weapons = ["Épée", "Hache", "Lance", "Masse", "Dague"];

export default function Home() {
  const [fighter, setFighter] = useState<Fighter | null>(null);

  const generateFighter = () => {
    setFighter({
      name: names[Math.floor(Math.random() * names.length)],
      strength: Math.floor(Math.random() * 10) + 1,
      speed: Math.floor(Math.random() * 10) + 1,
      health: Math.floor(Math.random() * 10) + 1,
      weapon: weapons[Math.floor(Math.random() * weapons.length)],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-white">
      <h1 className="text-4xl font-bold">Medieval Fight ⚔️</h1>

      <button
        onClick={generateFighter}
        className="rounded bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
      >
        Générer un combattant
      </button>

      {fighter && (
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/5 p-6 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">{fighter.name}</h2>
          <p className="mb-2">⚔️ Arme : {fighter.weapon}</p>
          <p className="mb-2">💪 Force : {fighter.strength}</p>
          <p className="mb-2">⚡ Vitesse : {fighter.speed}</p>
          <p>❤️ Vie : {fighter.health}</p>
        </div>
      )}
    </main>
  );
}