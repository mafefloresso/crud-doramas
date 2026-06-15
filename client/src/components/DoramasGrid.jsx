import { useEffect, useState } from "react";
import Filters from "./Filters";
import axios from "../api/axios";
import Card from "./Card";

function DoramasGrid() {
  const [doramas, setDoramas] = useState([]);
  const [filters, setFilters] = useState({ title: "", genre: [], rating: "" });

  useEffect(() => {
    const fetchDoramas = async () => {
      try {
        const res = await axios.get("/doramas", { withCredentials: true });
        setDoramas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoramas();
  }, []);
  const matchesTitle = (dorama) => {
    return dorama.title.toLowerCase().includes(filters.title.toLowerCase());
  };

  const matchesGenre = (dorama) => {
    return (
      filters.genre.length === 0 ||
      dorama.genres.some((genre) => filters.genre.includes(genre))
    );
  };

  const matchesRating = (dorama) => {
    switch (filters.rating) {
      case "":
        return true;
      case "good":
        return dorama.rating >= 3.5;
      case "regular":
        return dorama.rating >= 2 && dorama.rating < 3.5;
      case "bad":
        return dorama.rating < 2;
      default:
        return true;
    }
  };

  const filteredDoramas = doramas.filter((dorama) => {
    return (
      matchesTitle(dorama) && matchesRating(dorama) && matchesGenre(dorama)
    );
  });

  return (
    <div className="flex flex-col">
      <div className="card bg-base-200 rounded-box h-fit mt-4">
      <Filters filters={filters} onChange={setFilters}  />
      </div>
      
      <div className="divider divider-accent"></div>
      <div className="flex flex-wrap gap-4 sm:justify-center md:justify-start m-4">
        {filteredDoramas.map((dorama) => (
          <Card key={dorama.id} content={dorama} />
        ))}
      </div>
    </div>
  );
}

export default DoramasGrid;
