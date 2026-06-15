import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Registro</h2>

          <form>
            <div className="form-control mb-4 ">
              <label className="label w-full">
                <span className="label-text">Nombre de usuario</span>
              </label>
              <input
                type="text"
                placeholder="Usuario"
                className="input input-bordered w-full"
                name="username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="input input-bordered w-full"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label w-full">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>
              Registrarse
            </button>
            {err && <p> {err}</p>}
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <a href="./login" className="link link-primary">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
