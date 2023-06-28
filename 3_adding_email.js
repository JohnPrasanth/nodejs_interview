const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
// Adding data base path
const dbPath = path.join(__dirname, "sample_name.db");

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
// Add email API
app.post("/email/", async (request, response) => {
  const { username, email } = request.body;
  // checking existing email verification
  const selectUserQuery = `SELECT * FROM user WHERE email_address = '${email}'`;
  const dbUser = await db.get(selectUserQuery);

  if (dbUser === undefined) {
    //adding new user
    const createUserQuery = `
      INSERT INTO 
        user (username, email_address) 
      VALUES 
        (
          '${username}', 
          '${email}'
        )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    // updating user name
    const updateUserName = `UPDATE user
        SET username=${username}
        WHERE email_address ='${email}'`;
    const dbResponse = await db.run(updateUserName);

    response.send(`updated user name`);
  }
});
