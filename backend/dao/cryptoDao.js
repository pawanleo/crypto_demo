const Crypto = require("../models/cryptoSchema");

const saveOrUpdateCryptoData = async (data) => {
  await Crypto.findOneAndUpdate(
    { code: data.code },
    data,
    { upsert: true, new: true }
  );
};


module.exports = {
  saveOrUpdateCryptoData
};