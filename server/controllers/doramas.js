import { db } from "../db.js";

export const getDoramas = (req, res) => {
  const { title, genre } = req.query;
  const userId = req.user.id;

  const genreList = genre ? genre.split(",").map((g) => g.trim()) : [];
  const values = [userId];
  let conditions = [];

  let query = `SELECT distinct vk.*
FROM view_kdramas vk
JOIN kdramas_genres kg ON vk.id = kg.id_kdrama
JOIN genres g on kg.id_genre = g.id
WHERE uid =?`;

  if (genreList.length > 0) {
    const placeholders = genreList.map(() => "?").join(",");
    conditions.push(`g.g_name IN (${placeholders})`);
    values.push(...genreList);
  }

  if (title) {
    conditions.push(`vk.title LIKE ?`);
    values.push(`%${title}%`);
  }

  /*
  if (rating) {
    conditions.push(`vk.rating >= ?`);
    values.push(rating);
  }*/

  if (conditions.length > 0) {
    query += " AND " + conditions.join(" AND ");
  }

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

export const getDorama = (req, res) => {
  const id = req.params.id;
  const query = `SELECT  DISTINCT vk.*
FROM view_kdramas_ext vk
JOIN kdramas_genres kg ON vk.id = kg.id_kdrama
JOIN genres g on kg.id_genre = g.id
WHERE vk.id=?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

export const createDorama = (req, res) => {
  const userId = req.user.id;
  const { title, rese, img, plot, rating, genres } = req.body;

  const insertQuery1 =
    "INSERT INTO kdramas (title, res, img, plot, rating, uid) VALUES (?)";
  const values = [title, rese, img, plot, rating, userId];
  db.query(insertQuery1, [values], (err, result1) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al insertar en tabla1", details: err });

    const insertId = result1.insertId; // Este es el ID generado automáticamente

    // Segundo insert, usando el ID del primero
    const insertQuery2 =
      "INSERT INTO kdramas_genres (id_kdrama, id_genre) VALUES ?";
    const values2 = genres.map((genre) => [insertId, parseInt(genre)]);
    db.query(insertQuery2, [values2], (err, result2) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error al insertar en tabla2", details: err });

      res
        .status(201)
        .json({
          message: "Insertado correctamente en ambas tablas",
          id: insertId,
        });
    });
  });
};

export const updateDorama = (req, res) => {
  const { title, rese, img, plot, rating, genres } = req.body;
  const kdramaId = req.params.id;

  const updateQuery1 =
    "UPDATE kdramas SET title = ?, res = ?, img = ?, plot = ?, rating = ? WHERE id = ?";
  const values = [title, rese, img, plot, rating, kdramaId];
  db.query(updateQuery1, values, (err, result1) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al actualizar en tabla1", details: err });
      })


// Convertimos a enteros por seguridad
const genresInt = genres.map(g => parseInt(g));

const selectQuery = 'SELECT id_genre FROM kdramas_genres WHERE id_kdrama = ?';
db.query(selectQuery, [kdramaId], (err, result) => {
  if (err) return res.status(500).json({ error: 'Error al obtener géneros actuales', details: err });

  const currentGenres = result.map(row => row.id_genre);

  const genresToRemove = currentGenres.filter(g => !genresInt.includes(g));
  const genresToAdd = genresInt.filter(g => !currentGenres.includes(g));

  // 1. Eliminar géneros
  if (genresToRemove.length > 0) {
    const deleteQuery = `DELETE FROM kdramas_genres WHERE id_kdrama = ? AND id_genre IN (?)`;
    db.query(deleteQuery, [kdramaId, genresToRemove], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al eliminar géneros', details: err2 });

      // 2. Insertar géneros nuevos
      if (genresToAdd.length > 0) {
        const values = genresToAdd.map(genreId => [kdramaId, genreId]);
        const insertQuery = `INSERT INTO kdramas_genres (id_kdrama, id_genre) VALUES ?`;
        db.query(insertQuery, [values], (err3) => {
          if (err3) return res.status(500).json({ error: 'Error al insertar nuevos géneros', details: err3 });

          return res.status(200).json({ message: 'Géneros actualizados correctamente' });
        });
      } else {
        return res.status(200).json({ message: 'Géneros eliminados correctamente' });
      }
    });
  } else {
    // Solo hay que insertar géneros nuevos
    if (genresToAdd.length > 0) {
      const values = genresToAdd.map(genreId => [kdramaId, genreId]);
      const insertQuery = `INSERT INTO kdramas_genres (id_kdrama, id_genre) VALUES ?`;
      db.query(insertQuery, [values], (err4) => {
        if (err4) return res.status(500).json({ error: 'Error al insertar nuevos géneros', details: err4 });

        return res.status(200).json({ message: 'Nuevos géneros insertados correctamente' });
      });
    } else {
      return res.status(200).json({ message: 'No hubo cambios en los géneros' });
    }
  }
});


}

export const deleteDorama = (req, res) => {
  const kdramaId = req.params.id;

  const query = "DELETE FROM kdramas WHERE id = ?";
  db.query(query, [kdramaId], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al eliminar kdrama", details: err });
    return res.status(204).json({ message: "Kdrama eliminado correctamente" });
  });
  
};