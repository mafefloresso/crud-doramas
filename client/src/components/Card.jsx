import React from "react";
import { useNavigate } from "react-router-dom";

function Card({content}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card border border-b-fuchsia-900 bg-base-100 w-full sm:w-70 shadow-xl" key={content.id}>
        <figure className="md:h-40">
          <img
            src={content.img}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{content.title}</h2>
                       <div className="flex flex-wrap gap-2">
              {content.genres.map((genre) => (
                <div className="badge badge-soft badge-accent" key={genre} >{genre}</div>
              ))}
            </div>
          <p className="line-clamp-2">
            {content.plot}
          </p>
          <div className="card-actions justify-end">
            {/* Rating */}
            <div className="badge badge-outline badge-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffe200"
                  d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"
                />
              </svg>{content.rating}
            </div>
            {/* Button */}
            <button className="btn  rounded-full btn-sm bg-violet-800" onClick={() => navigate(`/doramas/${content.id}`)} >Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
