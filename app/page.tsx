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

function generateRandomFighter(): Fighter {
  return {
    name: names[Math.floor(Math.random() * names.length)],
    strength: Math.floor(Math.random() * 10) + 1,
    speed: Math.floor(Math.random() * 10) + 1,
    health: Math.floor(Math.random() * 10) + 1,
    weapon: weapons[Math.floor(Math.random() * weapons.length)],
  };
}

export default function Home() {
  const [fighter1, setFighter1] = useState<Fighter | null>(null);
  const [fighter2, setFighter2] = useState<Fighter | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const generateFight = () => {
    setFighter1(generateRandomFighter());
    setFighter2(generateRandomFighter());
    setWinner(null);
  };

  const fight = () => {
    if (!fighter1 || !fighter2) return;

    const score1 =
      fighter1.strength * 2 + fighter1.speed + fighter1.health;
    const score2 =
      fighter2.strength * 2 + fighter2.speed + fighter2.health;

    if (score1 > score2) {
      setWinner(fighter1.name);
    } else if (score2 > score1) {
      setWinner(fighter2.name);
    } else {
      setWinner("Égalité");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-white">
      <h1 className="text-4xl font-bold">Medieval Fight ⚔️</h1>

      <button
        onClick={generateFight}
        className="rounded bg-white px-6 py-3 font-semibold text-black"
      >
        Générer un combat
      </button>

      <div className="flex gap-6">
        {fighter1 && (
          <div className="rounded-xl border p-4">
            <h2 className="font-bold">{fighter1.name}</h2>
            <p>{fighter1.weapon}</p>
            <p>Force: {fighter1.strength}</p>
            <p>Vitesse: {fighter1.speed}</p>
            <p>Vie: {fighter1.health}</p>
          </div>
        )}

        {fighter2 && (
          <div className="rounded-xl border p-4">
            <h2 className="font-bold">{fighter2.name}</h2>
            <p>{fighter2.weapon}</p>
            <p>Force: {fighter2.strength}</p>
            <p>Vitesse: {fighter2.speed}</p>
            <p>Vie: {fighter2.health}</p>
          </div>
        )}
      </div>

      {fighter1 && fighter2 && (
        <button
          onClick={fight}
          className="rounded bg-red-500 px-6 py-3 font-bold"
        >
          ⚔️ Lancer le combat
        </button>
      )}

      {winner && (
        <div className="text-2xl font-bold mt-4">
          🏆 Résultat : {winner}
        </div>
      )}
    </main>
  );
}