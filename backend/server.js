const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
require('dotenv').config(); 

mongoose.connect( config.dbString, {

})
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Initialization failed", err);
    process.exit(1);
  });
