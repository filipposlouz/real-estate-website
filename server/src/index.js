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

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM "Users" WHERE "username" = '${username}';`
    );
    // console.log(user.rows);
    // await bcrypt.hash(user.rows[0].password, saltRounds, (err, hash) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(hash);
    // });
    // console.log(user.rows.length);
    if (user.rows.length > 0) {
      bcrypt.compare(
        password,
        user.rows[0].password,
        async (error, response) => {
          if (response) {
            const { Id } = user.rows[0];
            // const role = await pool.query(
            //   `SELECT * FROM "Admin" WHERE "Id" = ${Id};`
            // );
            await bcrypt.hash(
              user.rows[0].username + Id,
              saltRounds,
              (err, hash) => {
                if (err) {
                  console.log(err);
                }
                res.status(200).json({ success: true, id: Id + hash });
              }
            );
            //   if (user.rows.length > 0) {
            //     console.log(hash);
            //     res.status(200).json({ success: true, id: hash });
            //   }
            // } else {
            //   res.send({
            //     success: false,
            //     message: "Wrong username or password.",
            //   });
            // }
          }
        }
      );
    } else {
      res.send({ success: false, message: "Wrong username or password." });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const checkEmail = await pool.query(
      `SELECT * FROM "Users" WHERE "email" = '${email}'`
    );
    if (checkEmail.rows.length > 0) {
      res.send({ success: false, message: "Email already exists." });
      return;
    }
    const checkUser = await pool.query(
      `SELECT * FROM "Users" WHERE "username" = '${username}'`
    );
    if (checkUser.rows.length > 0) {
      res.send({ success: false, message: "Username already exists." });
      return;
    }
    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      await pool.query(
        `INSERT INTO "Users" ("email", "username", "password") VALUES ('${email}', '${username}', '${hash}');`
      );
      const id = await pool.query(
        `SELECT * FROM "Users" WHERE "username" = '${username}' AND "email" = '${email}'`
      );
      await bcrypt.hash(
        username + id.rows[0].Id,
        saltRounds,
        async (err, hash) => {
          if (err) {
            console.error(err);
          }
          res.send({ success: true, id: id.rows[0].id + hash });
        }
      );
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/verify", async (req, res) => {
  try {
    let { hash } = req.body;
    const id = hash[0];
    hash = hash.slice(1);
    const user = await pool.query(`SELECT * FROM "Users" WHERE "Id" = '${id}'`);
    bcrypt.compare(user.rows[0].username + id, hash, async (err, response) => {
      if (response) {
        const role = await pool.query(
          `SELECT * FROM "Admin" WHERE "Id" = '${id}'`
        );
        if (role.rows.length > 0) {
          res.send({ success: true, role: "Admin" });
        } else {
          res.send({ success: true, role: "Basic" });
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/mylistings", async (req, res) => {
  try {
    let { hash } = req.body;
    const id = hash[0];
    hash = hash.slice(1);
    const user = await pool.query(`SELECT * FROM "Users" WHERE "Id" = '${id}'`);
    bcrypt.compare(user.rows[0].username + id, hash, async (err, response) => {
      if (response) {
        // FILL HERE
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete("/property/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProperty = await pool.query(
      `DELETE FROM "Property" WHERE "Id" = ${id}`
    );
    res.status(200).json("Employee was deleted");
  } catch (err) {
    console.error(err);
  }
});

app.get("/properties/image/:id", async (req, res) => {
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
