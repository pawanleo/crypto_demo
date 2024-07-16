const {fetchCryptoDataService,getRecentCryptoDataService}=require("../services/crytpoServices")

const getRecentCryptoData = async (req, res) => {
  try {
    const { code } = req.params;
    const data = await getRecentCryptoDataService(code);
  
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCryptoData = async (req, res) => {
  try {
    await getRecentCryptoDataService();
    res.status(200).send('Data updated successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecentCryptoData,
  updateCryptoData,
};
