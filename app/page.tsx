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
    health: Math.floor(Math.random() * 20) + 20,
    weapon: weapons[Math.floor(Math.random() * weapons.length)],
  };
}

export default function Home() {
  const [fighter1, setFighter1] = useState<Fighter | null>(null);
  const [fighter2, setFighter2] = useState<Fighter | null>(null);
  const [currentHealth1, setCurrentHealth1] = useState<number | null>(null);
  const [currentHealth2, setCurrentHealth2] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const generateFight = () => {
    const newFighter1 = generateRandomFighter();
    const newFighter2 = generateRandomFighter();

    setFighter1(newFighter1);
    setFighter2(newFighter2);
    setCurrentHealth1(newFighter1.health);
    setCurrentHealth2(newFighter2.health);
    setWinner(null);
    setLog([]);
  };

  const fight = () => {
    if (
      !fighter1 ||
      !fighter2 ||
      currentHealth1 === null ||
      currentHealth2 === null
    ) {
      return;
    }

    let hp1 = currentHealth1;
    let hp2 = currentHealth2;
    const fightLog: string[] = [];

    let attacker = fighter1;
    let defender = fighter2;

    if (fighter2.speed > fighter1.speed) {
      attacker = fighter2;
      defender = fighter1;
    }

    let attackerHp = attacker.name === fighter1.name ? hp1 : hp2;
    let defenderHp = defender.name === fighter1.name ? hp1 : hp2;

    while (attackerHp > 0 && defenderHp > 0) {
      const damage = attacker.strength;
      defenderHp -= damage;

      fightLog.push(
        `${attacker.name} attaque ${defender.name} avec ${attacker.weapon} et inflige ${damage} dégâts.`
      );

      if (defenderHp <= 0) {
        fightLog.push(`${defender.name} est vaincu.`);
        break;
      }

      const tempFighter = attacker;
      attacker = defender;
      defender = tempFighter;

      const tempHp = attackerHp;
      attackerHp = defenderHp;
      defenderHp = tempHp;
    }

    if (fighter1.name === attacker.name) {
      hp1 = attackerHp;
      hp2 = defenderHp;
    } else if (fighter1.name === defender.name) {
      hp1 = defenderHp;
      hp2 = attackerHp;
    }

    setCurrentHealth1(Math.max(0, hp1));
    setCurrentHealth2(Math.max(0, hp2));
    setLog(fightLog);

    if (hp1 <= 0) {
      setWinner(fighter2.name);
    } else if (hp2 <= 0) {
      setWinner(fighter1.name);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 py-10 text-white">
      <h1 className="text-4xl font-bold">Medieval Fight ⚔️</h1>

      <button
        onClick={generateFight}
        className="rounded bg-white px-6 py-3 font-semibold text-black"
      >
        Générer un combat
      </button>

      <div className="flex flex-col gap-6 md:flex-row">
        {fighter1 && (
          <div className="w-72 rounded-xl border border-white/20 p-4">
            <h2 className="mb-2 text-xl font-bold">{fighter1.name}</h2>
            <p>⚔️ {fighter1.weapon}</p>
            <p>💪 Force : {fighter1.strength}</p>
            <p>⚡ Vitesse : {fighter1.speed}</p>
            <p>❤️ Vie max : {fighter1.health}</p>
            <div className="mt-2">
  <div className="mt-2">
  <div className="mb-1 text-sm">
    🩸 Vie : {currentHealth1 ?? 0} / {fighter1?.health ?? 0}
  </div>
  <div className="h-3 w-full rounded bg-gray-700">
    <div
      className="h-3 rounded bg-red-500 transition-all duration-500"
      style={{
        width: `${((currentHealth1 ?? 0) / (fighter1?.health ?? 1)) * 100}%`,
      }}
    />
  </div>
</div>
          </div>
        )}

        {fighter2 && (
          <div className="w-72 rounded-xl border border-white/20 p-4">
            <h2 className="mb-2 text-xl font-bold">{fighter2.name}</h2>
            <p>⚔️ {fighter2.weapon}</p>
            <p>💪 Force : {fighter2.strength}</p>
            <p>⚡ Vitesse : {fighter2.speed}</p>
            <p>❤️ Vie max : {fighter2.health}</p>
            <div className="mt-2">
  <div className="mt-2">
  <div className="mb-1 text-sm">
    🩸 Vie : {currentHealth2 ?? 0} / {fighter2?.health ?? 0}
  </div>
  <div className="h-3 w-full rounded bg-gray-700">
    <div
      className="h-3 rounded bg-red-500 transition-all duration-500"
      style={{
        width: `${((currentHealth2 ?? 0) / (fighter2?.health ?? 1)) * 100}%`,
      }}
    />
  </div>
</div>
          </div>
        )}
      </div>

      {fighter1 && fighter2 && (
        <button
          onClick={fight}
          className="rounded bg-red-600 px-6 py-3 font-bold"
        >
          ⚔️ Lancer le combat
        </button>
      )}

      {winner && <div className="text-2xl font-bold">🏆 Vainqueur : {winner}</div>}

      {log.length > 0 && (
        <div className="w-full max-w-3xl rounded-xl border border-white/20 p-4">
          <h3 className="mb-3 text-xl font-bold">Journal du combat</h3>
          <div className="space-y-2 text-sm text-white/90">
            {log.map((entry, index) => (
              <p key={index}>{entry}</p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}