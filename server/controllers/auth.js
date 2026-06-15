import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("El usuario o email ya existe!");
  });

  //Hash the password and create a user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
  const values = [req.body.username, req.body.email, hash];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("El usuario ha sido creado correctamente.");
  });
};

export const login =  (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json("Database error!");
    }
    if (data.length === 0) return res.status(404).json("Usuario no encontrado");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) return res.status(400).json("Contraseña incorrecta");
    const { password, ...other } = data[0];
    jwt.sign(
      { id: data[0].id },
      "secretkey",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        //console.log(token)
        res.cookie("access_token", token).status(200).json(other);

      }
    );
    //console.log("token: ", token);
    /*
    res
      .cookie("access_token", token)
      .status(200)
      .json(other);*/
  });
};

export const logout = (req, res) => {
  res.cookie("access_token", "", {expiresIn: new Date(0)});
  return res.sendStatus(200);
};
