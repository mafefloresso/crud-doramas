import React from "react";
import Filters from "../components/Filters";
import { useNavigate } from "react-router";
import DoramasGrid from "../components/DoramasGrid";

function Doramas() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Doramas</h1>
      
      <DoramasGrid />
      <button className="btn btn-circle btn-secondary fixed bottom-4 right-4 z-2" onClick={() => navigate("/doramas/new-dorama")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7-7v14"
          />
        </svg>
      </button>
    </div>
  );
}

export default Doramas;
