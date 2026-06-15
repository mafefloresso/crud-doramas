import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/authContext";

// Inicio de sesion con email y contraseña
function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);

      //console.log(res.data);
      navigate("/doramas");
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Inicia sesión</h2>

          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                required
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label w-full">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>
              Login
            </button>
            {err && <p> {err}</p>}
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            ¿Aún no tienes cuenta?{" "}
            <a href="./register" className="link link-primary">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
