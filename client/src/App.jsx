import "./App.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { DoramaProvider } from "./context/doramaContext";
import { GenreProvider } from "./context/genreContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

import Doramas from "./pages/Doramas";
import Dorama from "./pages/Dorama";
import DoramaFormPage from "./pages/DoramaFormPage";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/doramas/edit/:id",
        element: (
          <ProtectedRoute>
            <DoramaFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/doramas/:id",
        element: (
          <ProtectedRoute>
            <Dorama />
          </ProtectedRoute>
        ),
      },
      {
        path: "/doramas/new-dorama",
        element: (
          <ProtectedRoute>
            <DoramaFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/doramas",
        element: (
          <ProtectedRoute>
            <Doramas />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        ),
      },
      /*
      {
        path: "dorama/:id",
        element: <Doramas />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },*/
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container max-w-full">
        <GenreProvider>
          <DoramaProvider>
            <RouterProvider router={router} />
          </DoramaProvider>
        </GenreProvider>
      </div>
    </div>
  );
}

export default App;
