const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
