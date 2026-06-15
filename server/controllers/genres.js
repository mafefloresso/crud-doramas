import { db } from "../db.js";

export const getGenres = (req, res) => {
  const q = "SELECT * FROM genres";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
