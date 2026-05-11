"use client";

import { useState } from "react";

export default function RiskCalculator() {
  const [capital, setCapital] = useState("");
  const [risk, setRisk] = useState("");

  const riskAmount =
    capital && risk
      ? (Number(capital) * Number(risk)) / 100
      : 0;

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-green-400 mb-10">
        Risk Calculator
      </h1>

      <div className="max-w-xl bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <div className="mb-6">
          <label className="block mb-2">
            Total Capital ($)
          </label>

          <input
            type="number"
            placeholder="Enter capital"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Risk Percentage (%)
          </label>

          <input
            type="number"
            placeholder="Enter risk %"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700"
          />
        </div>

        <div className="mt-8 bg-green-500 text-black p-4 rounded-xl text-xl font-bold">
          Risk Amount: ${riskAmount}
        </div>

      </div>

    </main>
  );
}