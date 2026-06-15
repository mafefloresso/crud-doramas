import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoramas } from "../context/doramaContext";
import { useGenres } from "../context/genreContext";
import { useForm } from "react-hook-form";

function DoramaFormPage() {
  const { createDorama, getDorama, updateDorama } = useDoramas();
  const { getGenres, genres } = useGenres();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    async function loadGenres() {
      await getGenres();
    }
    loadGenres();
  }, []);

  useEffect(() => {
    async function loadDorama() {
      if (params.id) {
        const dorama = await getDorama(params.id);
        setValue("title", dorama.title);
        setValue("rese", dorama.res);
        setValue("img", dorama.img);
        setValue("plot", dorama.plot);
        setValue("rating", dorama.rating);
        setValue(
          "genres",
          dorama.genres.map((genre) => String(genre.id))
        );
        //console.log(getValues("genres"));
      }
    }
    loadDorama();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateDorama(params.id, {
          ...data,
        });
      } else {
        createDorama({
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedGenres = watch("genres") || [];
  const ratings = [
    "0.5",
    "1.0",
    "1.5",
    "2.0",
    "2.5",
    "3.0",
    "3.5",
    "4.0",
    "4.5",
    "5.0",
  ];

  return (
    <div className="p-6 max-w-3xl  mx-auto bg-base-200 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Formulario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4 flex flex-col">
          <label className="label  w-full">
            <span className="label-text">Titulo</span>
            <input
              type="text"
              placeholder="Titulo"
              {...register("title", { required: "El titulo es obligatorio" })}
              className={`input input-bordered w-full ml-4 ${
                errors.title ? "input-error" : ""
              }`}
              autoFocus
            />
          </label>
          <div className="flex flex-row justify-center align-center">
            {errors.title && (
              <span className="text-error text-sm">{errors.title.message}</span>
            )}
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label w-full">
            <span className="label-text">Link de imagen</span>
            <input
              type="text"
              placeholder="https://..."
              className={`input input-bordered w-full ml-4 ${
                errors.img ? "input-error" : ""
              }`}
              {...register("img", {
                required: "El link de imagen es obligatorio",
              })}
            />
          </label>
          <div className="flex flex-row justify-center align-center">
            {errors.img && (
              <span className="text-error text-sm">{errors.img.message}</span>
            )}
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label w-full">
            <span className="label-text">Plot</span>
            <textarea
              className={`textarea textarea-bordered ml-4 w-full ${
                errors.plot ? "textarea-error" : ""
              }`}
              placeholder="Escribe algo..."
              {...register("plot", { required: "El plot es obligatorio" })}
              rows={4}
            ></textarea>
          </label>
          <div className="flex flex-row justify-center align-center">
            {errors.plot && (
              <span className="text-error text-sm">{errors.plot.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-row flex-wrap mb-4 justify-center">
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={`${genre.id}`} //siempre string
                className="checkbox "
                checked={selectedGenres.includes(`${genre.id}`)}
                {...register("genres")}
              />
              {genre.g_name}
            </label>
          ))}
        </div>

        <div className="form-control mb-4">
          <label className="label  w-full">
            <span className="label-text">Reseña</span>
            <textarea
              className={`textarea textarea-bordered ml-4 w-full ${
                errors.rese ? "textarea-error" : ""
              }`}
              placeholder="Escribe algo..."
              {...register("rese", {
                required: "La reseña es obligatoria",
                maxLength: {
                  value: 1000,
                  message: "La reseña debe tener menos de 1000 caracteres",
                },
              })}
              rows={4}
            ></textarea>
          </label>
          <div className="flex flex-row justify-center align-center">
            {errors.rese && (
              <span className="text-error text-sm">{errors.rese.message}</span>
            )}
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label  w-full">
            <span className="label-text">Rating</span>
            <select
              defaultValue="Selecciona"
              className={`select select-bordered ml-4 ${
                errors.rating ? "select select-error" : ""
              }`}
              {...register("rating", {
                pattern: {
                  value: /^[0-9]\.[0-9]$/,
                  message: "Seleccione una opción válida",
                },
              })}
            >
              <option disabled={true}>Selecciona</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-row justify-center align-center">
            {errors.rating && (
              <span className="text-error text-sm">
                {errors.rating.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex form-control mt-6 justify-center">
          <div className="flex items-center">
            <button className="btn btn-primary">
              {params.id ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
        {isSubmitSuccessful && (
          <div className="alert alert-success shadow-lg mt-4">
            <span>Dorama {params.id ? "actualizado" : "agregado"} correctamente</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default DoramaFormPage;
