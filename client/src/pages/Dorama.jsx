import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoramas } from "../context/doramaContext";
import  RatingDisplay from "../components/RatingDisplay";
import ConfirmationModal from "../components/ConfirmationModal";


function Dorama() {
  const { getDorama, deleteDorama} = useDoramas();
  const navigate = useNavigate();
  const params = useParams();

  const [dorama, setDorama] = useState({});
  const [genres, setGenres] = useState([]); 

  const [modalVisible, setModalVisible] = useState(false);
  const [modalParams, setModalParams] = useState({});

  useEffect(() => {
    async function loadDorama() {
      if (params.id) {
        const d = await getDorama(params.id);
        setDorama(d);
        setGenres(d.genres);
      }
    }
    loadDorama();
  }, []);

    const handleDeleteClick = () => {
    setModalParams({
      message: `¿Realmente deseas eliminar el dorama - ${dorama.title}?`,
      onConfirm: () => {

        deleteDorama(dorama.id);
        navigate("/doramas");
        /*
        console.log("Elemento eliminado.");
        setModalVisible(false);*/
      },
      onCancel: () => {
        console.log("Cancelado");
        setModalVisible(false);
      },
    });
    setModalVisible(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-base-200 p-4">
      {" "}
      {/* items-center */}
      <div className="card w-full max-w-6xl bg-base-100 shadow-xl m-4">
        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <figure className="md:w-1/3 w-full">
            <img
              src={dorama.img}
              alt="Imagen del dorama"
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Contenido */}
          <div className="card-body md:w-2/3 w-full">
            <h2 className="card-title text-2xl">{dorama.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.map((genre) => (
                <div className="badge badge-soft badge-accent" key={genre.id}>
                  {genre.g_name}
                </div>
              ))}
            </div>

            <div>
              <RatingDisplay rating={dorama.rating} />
            </div>

            <h3 className="text-xl font-semibold">Plot</h3>
            <p className="text-base-content line-clamp-3">{dorama.plot}</p>

            <h3 className="text-xl font-semibold">Reseña</h3>
            <p className="line-clamp-4">{dorama.res}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className="btn btn-circle btn-info"
                onClick={() => navigate(`/doramas/edit/${params.id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
                  />
                  <path
                    fill="#fff"
                    d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
                  />
                </svg>
              </button>
              <button
                className="btn btn-circle btn-error"
                onClick={handleDeleteClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
                  />
                </svg>
              </button>

              {modalVisible && (
                <ConfirmationModal
                  message={modalParams.message}
                  onConfirm={modalParams.onConfirm}
                  onCancel={modalParams.onCancel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dorama;
