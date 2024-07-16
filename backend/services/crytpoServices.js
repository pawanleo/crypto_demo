const axios = require("axios");
const Crypto = require("../models/cryptoSchema");

const fetchCryptoDataService = async () => {
  const cryptos = ["BTC", "ETH", "USDT", "BNB", "SOL"]; // Example cryptos
  try {
    for (let code of cryptos) {
      const response = await axios.post(
        "https://api.livecoinwatch.com/coins/single",
        {
          currency: "USD",
          code: code,
          meta: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "f2bc6a38-d907-4464-86c7-efc354e0ac99",
          },
        }
      );

      const price = response.data;

      const entry = {
        name: price.name,
        code: code,
        symbol: price.symbol,
        rank: price.rank,
        age: price.age,
        color: price.color,
        png32: price.png32,
        png64: price.png64,
        webp32: price.webp32,
        webp64: price.webp64,
        exchanges: price.exchanges,
        markets: price.markets,
        pairs: price.pairs,
        allTimeHighUSD: price.allTimeHighUSD,
        circulatingSupply: price.circulatingSupply,
        totalSupply: price.totalSupply,
        maxSupply: price.maxSupply,
        categories: price.categories,
        rate: price.rate,
        volume: price.volume,
        cap: price.cap,
        delta: {
          hour: price.delta.hour,
          day: price.delta.day,
          week: price.delta.week,
          month: price.delta.month,
          quarter: price.delta.quarter,
          year: price.delta.year,
        },
      };
  
      await Crypto.create(entry);
    }
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

const getRecentCryptoDataService = async (cryptoCode) => {
  return Crypto.find({ code: cryptoCode }).sort({ createdAt: -1 }).limit(20);
};

module.exports = {
  fetchCryptoDataService,
  getRecentCryptoDataService,
};
