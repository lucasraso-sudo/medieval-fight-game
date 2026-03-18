"use client";

import { useState } from "react";

type Fighter = {
  name: string;
  strength: number;
  speed: number;
  agility: number;
  defense: number;
  health: number;
  weapon: string;
};

const names = ["Aldric", "Borin", "Cedric", "Darian", "Edric"];
const weapons = ["Épée", "Hache", "Lance", "Masse", "Dague"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomFighter(): Fighter {
  const totalPoints = 32;

  let strength = 4;
  let speed = 4;
  let agility = 4;
  let defense = 4;
  let health = 24;

  let remaining =
    totalPoints - (strength + speed + agility + defense + health / 2);

  while (remaining > 0) {
    const choice = randomInt(1, 5);

    if (choice === 1 && strength < 8) {
      strength += 1;
      remaining -= 1;
    } else if (choice === 2 && speed < 8) {
      speed += 1;
      remaining -= 1;
    } else if (choice === 3 && agility < 8) {
      agility += 1;
      remaining -= 1;
    } else if (choice === 4 && defense < 8) {
      defense += 1;
      remaining -= 1;
    } else if (choice === 5 && health < 32) {
      health += 2;
      remaining -= 1;
    }
  }

  return {
    name: names[Math.floor(Math.random() * names.length)],
    strength,
    speed,
    agility,
    defense,
    health,
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
  const [isFighting, setIsFighting] = useState(false);

  const generateFight = () => {
    const newFighter1 = generateRandomFighter();
    const newFighter2 = generateRandomFighter();

    setFighter1(newFighter1);
    setFighter2(newFighter2);
    setCurrentHealth1(newFighter1.health);
    setCurrentHealth2(newFighter2.health);
    setWinner(null);
    setLog([]);
    setIsFighting(false);
  };

  const fight = async () => {
    if (
      !fighter1 ||
      !fighter2 ||
      currentHealth1 === null ||
      currentHealth2 === null ||
      isFighting
    ) {
      return;
    }

    setIsFighting(true);
    setLog([]);
    setWinner(null);

    let hp1 = currentHealth1;
    let hp2 = currentHealth2;

    let attacker = fighter1;
    let defender = fighter2;

    if (fighter2.speed > fighter1.speed) {
      attacker = fighter2;
      defender = fighter1;
    }

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    while (hp1 > 0 && hp2 > 0) {
      const hitChance =
        attacker.agility / (attacker.agility + defender.agility);
      const didHit = Math.random() < hitChance;
      const isCritical = Math.random() < 0.2;

      let rawDamage = 0;
      let finalDamage = 0;

      if (didHit) {
        rawDamage = attacker.strength;

        if (isCritical) {
          rawDamage *= 2;
        }

        finalDamage = Math.max(1, rawDamage - defender.defense);
      }

      if (attacker.name === fighter1.name) {
        hp2 -= finalDamage;
      } else {
        hp1 -= finalDamage;
      }

      let message = `${attacker.name} attaque ${defender.name} avec ${attacker.weapon}`;

      if (!didHit) {
        message += " mais rate son attaque ❌";
      } else {
        if (isCritical) {
          message += " 💥 COUP CRITIQUE !";
        }
        message += ` et inflige ${finalDamage} dégâts`;
        if (defender.defense > 0) {
          message += ` (${defender.defense} bloqués par l’armure)`;
        }
        message += ".";
      }

      setLog((prev) => [...prev, message]);

      setCurrentHealth1(Math.max(0, hp1));
      setCurrentHealth2(Math.max(0, hp2));

      if (hp1 <= 0 || hp2 <= 0) {
        break;
      }

      const temp = attacker;
      attacker = defender;
      defender = temp;

      await sleep(700);
    }

    if (hp1 <= 0) {
      setWinner(fighter2.name);
      setLog((prev) => [...prev, `${fighter1.name} est vaincu.`]);
    } else if (hp2 <= 0) {
      setWinner(fighter1.name);
      setLog((prev) => [...prev, `${fighter2.name} est vaincu.`]);
    }

    setIsFighting(false);
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
            <p>🎯 Agilité : {fighter1.agility}</p>
            <p>🛡️ Défense : {fighter1.defense}</p>
            <p>❤️ Vie max : {fighter1.health}</p>

            <div className="mt-2">
              <div className="mb-1 text-sm">
                🩸 Vie : {currentHealth1 ?? 0} / {fighter1.health}
              </div>
              <div className="h-3 w-full rounded bg-gray-700">
                <div
                  className="h-3 rounded bg-red-500 transition-all duration-500"
                  style={{
                    width: `${((currentHealth1 ?? 0) / fighter1.health) * 100}%`,
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
            <p>🎯 Agilité : {fighter2.agility}</p>
            <p>🛡️ Défense : {fighter2.defense}</p>
            <p>❤️ Vie max : {fighter2.health}</p>

            <div className="mt-2">
              <div className="mb-1 text-sm">
                🩸 Vie : {currentHealth2 ?? 0} / {fighter2.health}
              </div>
              <div className="h-3 w-full rounded bg-gray-700">
                <div
                  className="h-3 rounded bg-red-500 transition-all duration-500"
                  style={{
                    width: `${((currentHealth2 ?? 0) / fighter2.health) * 100}%`,
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
          disabled={isFighting}
          className="rounded bg-red-600 px-6 py-3 font-bold disabled:opacity-50"
        >
          {isFighting ? "Combat en cours..." : "⚔️ Lancer le combat"}
        </button>
      )}

      {winner && (
        <div className="text-2xl font-bold">🏆 Vainqueur : {winner}</div>
      )}

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