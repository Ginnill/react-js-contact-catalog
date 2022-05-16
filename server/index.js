const fs = require("fs");
const path = require("path");
// express
const express = require("express");
const app = express();
// cors
const cors = require("cors");
// mysql
const mysql = require("mysql");
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// connecting database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "teste_fortunato_db",
});

// multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "../client/src/uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

let upload = multer({ storage });

// express config
app.use(cors());
app.use(express.json());
// register user
app.post("/register", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  const sqlCheck = "SELECT * FROM users WHERE email = ?";
  const sql = "INSERT INTO users(name, email, password) VALUES(?,?,?)";

  // checking if the user already exists
  db.query(sqlCheck, [email], (err, result) => {
    if (err) res.send(err);

    //creating user if not exist
    if (result.length == 0) {
      //insert user and encrypting the password
      bcrypt.hash(password, saltRounds, (erro, hash) => {
        db.query(sql, [name, email, hash], (err, result) => {
          if (err) res.send(err);
          res.send({ msg: "Usuário Cadastrado com sucesso!" });
        });
      });
    } else {
      res.send({ error: "Usuário já cadastrado" });
    }
  });
});
// end register user

// send login results to front end
app.post("/login", (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  // checking if email exist
  db.query(sql, [email], (err, result) => {
    if (err) res.send(err);

    if (result.length > 0) {
      // checking if password is correct
      bcrypt.compare(password, result[0].password, (erro, result) => {
        if (result) res.send({ msg: "Usuário logado!" });
        else {
          res.send({ error: "A senha está incorreta!" });
        }
      });
    } else res.send({ error: "Email não encontrado!" });
  });
});
// end login

// get contacts
app.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM contacts";

  db.query(sql, (err, result) => {
    if (err) res.send(err);

    if (result.length == 0)
      res.send({ msg: "Não existe contatos cadastrados!" });
    else res.send(result);
  });
});

// get file
app.post("/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (file) {
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  } else res.send({ error: "arquivo vazio" });
});

// get create
app.post("/create", (req, res) => {
  const { name, email, phone, image } = req.body;
  const imgPath = "src/uploads/" + image;
  const sqlCheck = "SELECT * FROM contacts WHERE email = ? AND name = ?";

  db.query(sqlCheck, [email, name], (err, result) => {
    if (err) res.send(err);

    if (result.length == 0) {
      const sql =
        "INSERT INTO contacts (name,email,phone,image) VALUES(?,?,?,?)";

      db.query(sql, [name, email, phone, imgPath], (err, result) => {
        if (err) res.send(err);
        res.send({ msg: "Usuário Criado com Sucesso!" });
      });
    } else res.send({ error: "Esse contato já está cadastrado!" });
  });
});

// edit
app.post("/edit", (req, res) => {
  const { name, email, phone, image, id } = req.body;

  // const sqlCheck = "SELECT * FROM contacts WHERE email = ? AND name = ?";

  // db.query(sqlCheck, [email, name], (err, result) => {
  //   if (err) res.send(err);

  //   if (result.length == 0) {

  // const sqlImage =
  //   "UPDATE contacts SET image = ? WHERE contacts.id = ?";

  const sql =
    "UPDATE contacts SET name = ?, email = ?, phone = ?, image = ? WHERE contacts.id = ?";

  db.query(sql, [name, email, phone, image, id], (err, result) => {
    if (err) res.send(err);
    res.send({ msg: "Usuário Alterado com Sucesso!" });
  });
  // } else res.send({ error: "Esse contato já está cadastrado!" });
  // });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;

  const sql =
    "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    res.send({ msg: "Usuário deletado com sucesso!" });
  });
});

app.listen(3001, () => {
  console.log("rodando server");
});
