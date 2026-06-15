import {useEffect, useState} from "react";
import axios from "../api/axios";



function Filters({ filters, onChange }) {
  const [genres, setGenres] = useState([]);

    useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("/genres");
        setGenres(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    let newGenres;
    if (checked) {
      newGenres = [...filters.genre, value];
    } else {
      newGenres = filters.genre.filter((genre) => genre !== value);
    }
    onChange({ ...filters, genre: newGenres });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 ml-4 p-2">
      <label className="label font-bold ">
        Nombre
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          placeholder="Escribe aquí"
          className="input"
        />
      </label>
      <div className="select m-4">
        <span className="label font-bold">Calificación</span>
        {
          <select name="rating" value={filters.rating} onChange={handleChange}>
            <option value="">Todo</option>
            <option value="good">Bueno</option>
            <option value="regular">Regular</option>
            <option value="bad">Malo</option>
          </select>
        }
      </div>
  
      <div className="flex flex-row flex-wrap">
        <span className="label font-bold">Género</span>
        {genres.map((genre) => (
          <label key={genre.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={genre.g_name}
              className="checkbox "
              checked={filters.genre.includes(genre.g_name)}
              onChange={handleGenreChange}
            />
            {genre.g_name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Filters;
