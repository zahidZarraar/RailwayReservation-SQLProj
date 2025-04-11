const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const bcrypt = require("bcrypt"); // checks whether the password is valid or not

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome {to} root URL of Server");
});

app.post("/signup", async (req, res) => {
  const user = await req.body;
  console.log("fName : ", user.fName);
  const query = `INSERT INto users (f_name, l_name, email, password, gender, marital, dob, mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      user.fName,
      user.lName,
      user.email,
      user.password,
      user.gender,
      user.marital_status,
      user.dob,
      user.mobile
    ],
    (err, response) => {
      if (err) throw err;
      console.log(`1 record inserted`);
      // localStorage.setItem("userId", userDetails.id);
      res.status(200).send({
        message: "User created successfully.",
      });
    }
  );
});

app.post("/login", async (req, res) => {
  const { username, password } = await req.body;
  const sqlQuery = "SELECT * from users WHERE f_name = ?";

  db.query(sqlQuery, [username], async (err, result) => {
    if (err) throw err;

    if ((await result.length) === 0) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    const user = await result[0]; // returns any 1 value that matches the result.
    console.log("result : ", user); 

    const isPasswordValid = password == String(user.password);
    // you can also use bcrypt for password comparison.
    console.log("pv : ", user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password." });
    }
    // localStorage.setItem("userId", await user.id);
    res.status(200).send({
      message: "User logged in successfully",
      userId: user.id
    });
  });
});

app.post("/findtrain", async (req, res) => {
  const { trainName, destination } = await req.body;
  const sqlQuery = `SELECT * from train_list WHERE (Name='${trainName}')
  and (Destination='${destination}') `;

  db.query(sqlQuery, async (err, result) => {
    if (err) throw err;

    if ((await result.length) === 0) {
      return res.status(401).send({
        message: "There is no train avalable. Please try again later!"
      });
    }

    console.log("result : ", result);
    res.status(200).send({
      message: "Trains Found",
      data: result
    });
  });
});

app.post("/reservation", async (req, res) => {
  console.log("body : ", req.body);
  const { from, to, quota, date } = await req.body;
  console.log("date : ", date);
  const sqlQuery = `SELECT * from interlist WHERE (Ori='${from}' or st1='${from}' or st2='${from}' or st3='${from}' or st4='${from}' or st5='${from}') and (st1='${to}' or st2='${to}' or st3='${to}' or st4='${to}' or st5='${to}' or Dest='${to}') and (Mon='Y')`;

  db.query(sqlQuery, async (err, result) => {
    if (err) throw err;

    if ((await result.length) === 0) {
      return res.status(401).send({
        message: "There is no train avalable. Please try again later!"
      });
    }
    console.log("result : ", result);
    res.status(200).send({
      message: "Trains Found",
      data: result
    });
  });
});

app.post("/getuser", async (req, res) => {
  const { userId } = await req.body;
  const sqlQuery = `SELECT * from users WHERE (users.id = '${userId}')`;
  db.query(sqlQuery, async (err, result) => {
    if (err) throw err;

    if ((await result.length) === 0) {
      return res.status(401).send({
        message: "No User Found with that username."
      });
    }
    res.status(200).send({
      message: "User Found",
      data: result[0]
    });
  });
});

app.put("/updateuser", async (req, res) => {
  const { id, firstName, lastName, email, gender, marital, dob, mobile } =
    await req.body;
  const sqlQuery = `UPDATE users SET l_name ='${lastName}', f_name = '${firstName}', email='${email}', gender='${gender}', marital='${marital}', dob='${dob}', mobile='${mobile}' WHERE users.id = ${id}`;
  db.query(sqlQuery, async (err, result) => {
    if (err) throw err;

    if ((await result.length) === 0) {
      return res.status(401).send({
        message: "No User Found with that username."
      });
    }
    res.status(200).send({
      message: "User Found",
      data: result
    });
  });
});

app.post("/deleteuser", async (req, res) => {
  const { userId } =
    await req.body;
  console.log('user : ', userId);
  const sqlQuery = `DELETE FROM users WHERE id = ${userId}`;
  db.query(sqlQuery, async (err, result) => {
    if (err) throw err;
    console.log('result : ', result);
    if ((await result.length) === 0) {
      return res.status(401).send({
        message: "No User Found with that username."
      });
    }
    res.status(200).send({
      message: "User Deleted Succesfully"
    });
  });
});

app.listen(3000, (err) => {
  if (!err) {
    console.log(`Server is running on port 3000`);
    db.connect((err) => {
      if (err) {
        console.log("error while connecting database!");
        throw err;
      } else {
        console.log("Database connected successfully");
      }
    });
  } else {
    console.log("error occured in server : ", err);
  }
});
