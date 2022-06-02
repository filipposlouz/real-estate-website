const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("body-parser");
const path = require("path");
const fileupload = require("express-fileupload");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// middleware
app.use(cors());
app.use(express.json()); // req.body
app.use(fileupload());

const tokens = [];

function setExpiration(array, itemIndex, delay) {
  setTimeout(() => array.splice(itemIndex, 1), delay);
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// Get all properties from db
app.get("/properties", async (req, res) => {
  try {
    const listings = await pool.query(
      'SELECT "Property"."Id","Property"."nameOfOwner", "Property"."phoneOfOwner", "Property"."province", "Property"."placeInTown", "Property"."town", "Property"."address", "Property"."toSell", "Property"."squareMeters", "Property"."description", "Property"."price", "Property"."typeOfProperty", "Property"."numOfRooms", "Property"."Id_request" FROM "Property", "Request" WHERE "Request"."Id" = "Property"."Id_request" AND "Request"."Pending" = FALSE;'
    );
    res.status(200).json(listings.rows);
  } catch (err) {
    console.error(err);
  }
});

app.post("/propertiesFiltered", async (req, res) => {
  try {
    const {
      province,
      town,
      placeInTown,
      toSell,
      priceFrom,
      priceTo,
      sizeFrom,
      sizeTo,
      typeOfProperty,
      numOfRooms,
      numOfFloors,
    } = req.body;
    let query = `SELECT "Property"."Id","Property"."nameOfOwner", "Property"."phoneOfOwner", "Property"."province", "Property"."placeInTown", "Property"."town", "Property"."address", "Property"."toSell", "Property"."squareMeters", "Property"."description", "Property"."price", "Property"."typeOfProperty", "Property"."numOfRooms", "Property"."Id_request" FROM "Property", "Request" 
       WHERE "Request"."Id" = "Property"."Id_request" AND "Request"."Pending" = FALSE AND
       "Property"."toSell" = ${toSell} AND
       "Property"."typeOfProperty" = '${typeOfProperty}'`;
    if (province) query = query + ` AND "Property"."province" = '${province}'`;
    if (town !== "allStates" && town !== "undefined")
      query = query + ` AND "Property"."town" = '${town}'`;
    if (placeInTown !== "Όλες οι περιοχές")
      query = query + ` AND "Property"."placeInTown" = '${placeInTown}'`;
    if (numOfFloors === 6)
      query = query + ` AND "Property"."numOfFloors" >= ${numOfFloors}`;
    else if (numOfFloors !== "all")
      query = query + ` AND "Property"."numOfFloors" = ${numOfFloors}`;
    if (sizeFrom && sizeTo)
      query =
        query +
        ` AND "Property"."squareMeters" >= ${sizeFrom} AND
       "Property"."squareMeters" <= ${sizeTo}`;
    else if (sizeFrom && !sizeTo)
      query = query + ` AND "Property"."squareMeters" >= ${sizeFrom}`;
    else if (!sizeFrom && sizeTo)
      query = query + ` AND "Property"."squareMeters" <= ${sizeTo}`;
    if (priceFrom && priceTo)
      query =
        query +
        ` AND "Property"."price" >= ${priceFrom} AND
       "Property"."price" <= ${priceTo}`;
    else if (priceFrom && !priceTo)
      query = query + ` AND "Property"."price" >= ${priceFrom}`;
    else if (!priceFrom && priceTo)
      query = query + ` AND "Property"."price" <= ${priceTo}`;
    if (numOfRooms)
      query = query + ` AND "Property"."numOfRooms" = ${numOfRooms}`;
    listings = await pool.query(`${query};`);
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
    if (user.rows.length > 0) {
      bcrypt.compare(
        password,
        user.rows[0].password,
        async (error, response) => {
          if (response) {
            const { Id } = user.rows[0];
            await bcrypt.hash(
              user.rows[0].username + Id,
              saltRounds,
              (err, hash) => {
                if (err) {
                  console.log(err);
                }
                tokens.push(Id + hash);
                setExpiration(tokens, tokens.indexOf(Id + hash), 1200000);
                res.status(200).json({ success: true, id: Id + hash });
              }
            );
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

app.post("/logout", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM "Users" WHERE "username" = '${username}';`
    );
    if (user.rows.length > 0) {
      bcrypt.compare(
        password,
        user.rows[0].password,
        async (error, response) => {
          if (response) {
            const { Id } = user.rows[0];
            await bcrypt.hash(
              user.rows[0].username + Id,
              saltRounds,
              (err, hash) => {
                if (err) {
                  console.log(err);
                }
                removeItemOnce(tokens, Id + hash);
                res.status(200).json({ success: true });
              }
            );
          }
        }
      );
    } else {
      res.send({ success: false, message: "Bad Credentials." });
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
      await pool.query(`INSERT INTO "Basic" ("Id") VALUES (${id.rows[0].Id});`);
      await bcrypt.hash(
        username + id.rows[0].Id,
        saltRounds,
        async (err, hash) => {
          if (err) {
            console.error(err);
          }
          tokens.push(id.rows[0].Id + hash);
          setExpiration(tokens, tokens.indexOf(id.rows[0].Id + hash), 1200000);
          res.send({ success: true, id: id.rows[0].Id + hash });
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
    if (hash === null) {
      res.send({ success: true, role: "Basic" });
    } else {
      if (tokens.indexOf(hash) !== -1) {
        const id = hash.split("$")[0];
        hash = hash.replace(id, "");
        const user = await pool.query(
          `SELECT * FROM "Users" WHERE "Id" = '${id}'`
        );
        bcrypt.compare(
          user.rows[0].username + id,
          hash,
          async (err, response) => {
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
          }
        );
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/property/pending", async (req, res) => {
  try {
    let { hash } = req.body;
    if (tokens.indexOf(hash) !== -1) {
      const id = hash.split("$")[0];
      hash = hash.replace(id, "");
      const user = await pool.query(
        `SELECT * FROM "Users" WHERE "Id" = '${id}'`
      );
      const admin = await pool.query(
        `SELECT * FROM "Admin" WHERE "Id"='${id}'`
      );
      if (admin.rows.length > 0) {
        bcrypt.compare(
          user.rows[0].username + id,
          hash,
          async (err, response) => {
            if (response) {
              const pending = await pool.query(
                'SELECT "Property"."Id","Property"."nameOfOwner", "Property"."phoneOfOwner", "Property"."province", "Property"."placeInTown", "Property"."town", "Property"."address", "Property"."toSell", "Property"."squareMeters", "Property"."description", "Property"."price", "Property"."typeOfProperty", "Property"."numOfRooms", "Property"."Id_request" FROM "Property", "Request" WHERE "Request"."Id" = "Property"."Id_request" AND "Request"."Pending" = TRUE;'
              );
              res.status(200).json(pending.rows);
            }
          }
        );
      } else {
        res.json({ message: "Bad credentials" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/mylistings", async (req, res) => {
  try {
    let { hash } = req.body;
    if (tokens.indexOf(hash) !== -1) {
      const id = hash.split("$")[0];
      hash = hash.replace(id, "");
      const user = await pool.query(
        `SELECT * FROM "Users" WHERE "Id" = '${id}'`
      );
      bcrypt.compare(
        user.rows[0].username + id,
        hash,
        async (err, response) => {
          if (response) {
            const datamyProperties = await pool.query(
              `SELECT * FROM "Property" WHERE "id_basic"='${id}'`
            );
            res.status(200).json(datamyProperties.rows);
          }
        }
      );
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/createListings", async (req, res) => {
  try {
    let { hash } = req.body;
    if (tokens.indexOf(hash) !== -1) {
      const id = hash.split("$")[0];
      hash = hash.replace(id, "");
      const user = await pool.query(
        `SELECT * FROM "Users" WHERE "Id" = '${id}'`
      );
      bcrypt.compare(
        user.rows[0].username + id,
        hash,
        async (err, response) => {
          if (response) {
            const {
              nameOfOwner,
              phoneOfOwner,
              province,
              town,
              placeInTown,
              address,
              toSell,
              squareMeters,
              description,
              price,
              typeOfProperty,
              numOfRooms,
              numOfFloors,
            } = req.body;

            await pool.query(
              `INSERT INTO "Request" ("Pending","Id_basic") values (true,${id})`
            );

            const id_request = await pool.query(
              `SELECT * FROM "Request" WHERE "Id_basic" = '${id}' and "Pending"=true ORDER BY "Id" DESC;`
            );

            await pool.query(`INSERT INTO "Property" ("nameOfOwner","phoneOfOwner","town","placeInTown","province","address","toSell","squareMeters","description","price","typeOfProperty","numOfRooms","Id_request","id_basic","numOfFloors") VALUES 
            ('${nameOfOwner}', '${phoneOfOwner}', '${town}', '${placeInTown}', '${province}', '${address}', ${toSell}, ${squareMeters}, '${description}', ${price}, '${typeOfProperty}', ${numOfRooms}, ${id_request.rows[0].Id}, ${id}, ${numOfFloors});`);

            const houseId = await pool.query(
              `SELECT * FROM "Property" WHERE "id_basic" = ${id} AND "Id_request" = ${id_request.rows[0].Id}`
            );
            res.status(200).json({ success: true, id: houseId.rows[0].Id });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/property/:id/image", async (req, res) => {
  try {
    const file = req.files.fileToUpload;
    const { id } = req.params;

    file.mv(path.join(__dirname, "../images", `${id}.png`), (error) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/property/:id/pdf", async (req, res) => {
  try {
    const file = req.files.fileToUpload;
    const { id } = req.params;

    file.mv(path.join(__dirname, "../pdf", `${id}.pdf`), (error) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/property/acceptPending/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `UPDATE "Request" SET "Pending" = FALSE WHERE "Id" = ${id}`
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

app.get("/property/:id/pending", async (req, res) => {
  try {
    const { id } = req.params;
    const property = await pool.query(
      `SELECT * FROM "Property", "Request" WHERE "Request"."Pending" = TRUE and "Property"."Id_request" = "Request"."Id" AND "Property"."Id" = ${id};`
    );
    if (property.rows.length > 0) {
      res.status(200).json({ success: true, pending: true });
    } else {
      res.status(200).json({ success: true, pending: false });
    }
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
    res.status(200).json("Property was deleted successfully.");
  } catch (err) {
    console.error(err);
  }
});

app.get("/property/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const property = await pool.query(
      `SELECT * FROM "Property" WHERE "Id" = ${id}`
    );
    res.status(200).json(property.rows);
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

app.get("/properties/pdf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).sendFile(path.join(__dirname, "../pdf", `${id}.pdf`));
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
