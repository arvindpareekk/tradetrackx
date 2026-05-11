"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TradingJournal() {

  const [asset, setAsset] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [tradeType, setTradeType] = useState("LONG");
  const [emotion, setEmotion] = useState("😎");

  // Load trades from localStorage
  const [trades, setTrades] = useState<any[]>(() => {

    if (typeof window !== "undefined") {

      const savedTrades = localStorage.getItem("trades");

      return savedTrades ? JSON.parse(savedTrades) : [];
    }

    return [];
  });

  // Save trades
  useEffect(() => {
    localStorage.setItem("trades", JSON.stringify(trades));
  }, [trades]);

  // Profit Calculation
  const profit =
    buyPrice && sellPrice && quantity
      ? (Number(sellPrice) - Number(buyPrice)) * Number(quantity)
      : 0;

  // Add Trade
  const addTrade = () => {

    if (!asset || !buyPrice || !sellPrice || !quantity) {
      return;
    }

    const newTrade = {
      asset,
      buyPrice,
      sellPrice,
      quantity,
      tradeType,
      emotion,
      profit,
    };

    setTrades([newTrade, ...trades]);

    // Reset Form
    setAsset("");
    setBuyPrice("");
    setSellPrice("");
    setQuantity("");
    setTradeType("LONG");
    setEmotion("😎");
  };

  // Delete Trade
  const deleteTrade = (indexToDelete: number) => {

    const updatedTrades = trades.filter(
      (_, index) => index !== indexToDelete
    );

    setTrades(updatedTrades);
  };

  // Dashboard Stats
  const totalTrades = trades.length;

  const totalProfit = trades.reduce(
    (acc, trade) => acc + trade.profit,
    0
  );

  const winningTrades = trades.filter(
    (trade) => trade.profit > 0
  ).length;

  const losingTrades = trades.filter(
    (trade) => trade.profit < 0
  ).length;

  const winRate =
    totalTrades > 0
      ? ((winningTrades / totalTrades) * 100).toFixed(1)
      : 0;

  // Chart Data
  const chartData = trades.map((trade, index) => ({
    name: `Trade ${index + 1}`,
    profit: trade.profit,
  }));

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <h1 className="text-5xl font-bold text-green-400 mb-4">
        Trading Journal
      </h1>

      <p className="text-gray-400 mb-10 max-w-2xl">
        Log trades, analyze emotions,
        and improve your trading discipline.
      </p>

      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        {/* Total Trades */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">
            Total Trades
          </h2>

          <p className="text-3xl font-bold text-green-400">
            {totalTrades}
          </p>
        </div>

        {/* Total Profit */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">
            Total Profit
          </h2>

          <p className={`text-3xl font-bold ${
            totalProfit >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}>
            ₹{totalProfit}
          </p>
        </div>

        {/* Winning Trades */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">
            Winning Trades
          </h2>

          <p className="text-3xl font-bold text-green-400">
            {winningTrades}
          </p>
        </div>

        {/* Win Rate */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">
            Win Rate
          </h2>

          <p className="text-3xl font-bold text-green-400">
            {winRate}%
          </p>
        </div>

      </div>

      {/* Profit Analytics Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Profit Analytics
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={chartData}>

              <XAxis dataKey="name" stroke="#888" />

              <YAxis stroke="#888" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Trade Form */}
      <div className="max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10">

        {/* Asset */}
        <div className="mb-6">
          <label className="block mb-2">
            Asset Name
          </label>

          <input
            type="text"
            placeholder="BTC, RELIANCE..."
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          />
        </div>

        {/* Buy Price */}
        <div className="mb-6">
          <label className="block mb-2">
            Buy Price
          </label>

          <input
            type="number"
            placeholder="Enter buy price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          />
        </div>

        {/* Sell Price */}
        <div className="mb-6">
          <label className="block mb-2">
            Sell Price
          </label>

          <input
            type="number"
            placeholder="Enter sell price"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          />
        </div>

        {/* Trade Type */}
        <div className="mb-6">
          <label className="block mb-2">
            Trade Type
          </label>

          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block mb-2">
            Quantity
          </label>

          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          />
        </div>

        {/* Emotion */}
        <div className="mb-6">
          <label className="block mb-2">
            Emotion
          </label>

          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-gray-700 outline-none focus:border-green-400"
          >
            <option value="😎">Confident 😎</option>
            <option value="😨">Fear 😨</option>
            <option value="🤑">Greedy 🤑</option>
            <option value="😡">Revenge 😡</option>
          </select>
        </div>

        {/* Live Profit */}
        <div className={`mb-6 p-4 rounded-xl text-xl font-bold ${
          profit >= 0
            ? "bg-green-500 text-black"
            : "bg-red-500 text-white"
        }`}>
          Profit/Loss: ₹{profit}
        </div>

        {/* Add Trade */}
        <button
          onClick={addTrade}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all"
        >
          Add Trade
        </button>

      </div>

      {/* Trade History */}
      <div className="max-w-4xl">

        <h2 className="text-3xl font-bold mb-6">
          Trade History
        </h2>

        <div className="space-y-4">

          {trades.length === 0 && (
            <p className="text-gray-500">
              No trades added yet.
            </p>
          )}

          {trades.map((trade, index) => (

            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold text-lg">
                  {trade.asset}
                </h3>

                <p className="text-gray-400 text-sm">
                  Buy: ₹{trade.buyPrice} | Sell: ₹{trade.sellPrice}
                </p>

                <p className="text-gray-400 text-sm">
                  Quantity: {trade.quantity}
                </p>

                <p className="text-gray-400 text-sm">
                  Type: {trade.tradeType}
                </p>

                <p className="text-gray-400 text-sm">
                  Emotion: {trade.emotion}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div
                  className={`text-xl font-bold ${
                    trade.profit >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{trade.profit}
                </div>

                <button
                  onClick={() => deleteTrade(index)}
                  className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}