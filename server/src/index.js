const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("body-parser");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// middleware
app.use(cors());
app.use(express.json()); // req.body

// Get all properties from db
app.get("/properties", async (req, res) => {
  try {
    const listings = await pool.query(
      'SELECT * FROM "Property", "Request" WHERE "Request"."Pending" = FALSE and "Property"."Id_request" = "Request"."Id";'
    );
    res.status(200).json(listings.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).sendFile(path.join(__dirname, "../images", `${id}.png`));
  } catch (err) {
    console.error(err);
  }
});

// Get json data of towns for filtering
app.get("/allTowns", async (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "../data", "allTowns.json"));
  } catch (err) {
    console.error(err);
  }
});

// Get json data of achaia for filtering
app.get("/achaia", async (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../data", "allPlacesAchaia.json"));
  } catch (err) {
    console.error(err);
  }
});

// Get json data of aitolia & akarnania for filtering
app.get("/aitoliaAkarnania", async (req, res) => {
  try {
    res
      .status(200)
      .sendFile(
        path.join(__dirname, "../data", "allPlacesAitoliaAkarnania.json")
      );
  } catch (err) {
    console.error(err);
  }
});

// Get json data of fokida for filtering
app.get("/fokida", async (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../data", "allPlacesFokida.json"));
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
