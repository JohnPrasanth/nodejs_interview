const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
// Adding data base path
const dbPath = path.join(__dirname, "userData.db");

let db = null;
// initializing data base
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
// Add customer API call
app.post("/users/", async (request, response) => {
  const { username='', gender='',phoneNumber='' } = request.body;
  // checking existing customer verification
  if (username!=='' && gender!=='' && phoneNumber!==''){
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    //adding new user
    const createUserQuery = `
      INSERT INTO 
        user (username,  gender, phone_number) 
      VALUES 
        (
          '${username}', 
          '${gender}',
          '${phoneNumber}'
        )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("User already exists");
  }
      }
});
