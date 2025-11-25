import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";

// Páginas
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import EntryControl from "./pages/EntryControl.jsx";
import Visitors from "./pages/Visitors.jsx";
import AddVisitor from "./pages/AddVisitor.jsx";
import BasicBasket from "./pages/BasicBasket.jsx";
import Report from "./pages/Report.jsx";

// Rotas protegidas
import PrivateRoute from "./components/PrivateRoute.jsx";

// Verificação de token global
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Navigate to="/paginainicial" /> : <Login />,
  },
  {
    path: "/paginainicial",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/funcionarios",
    element: (
      <PrivateRoute>
        <Employees />
      </PrivateRoute>
    ),
  },
  {
    path: "/adicionarfuncionario",
    element: (
      <PrivateRoute>
        <AddEmployee />
      </PrivateRoute>
    ),
  },
  // Rota de edição por documento (CPF)
  {
    path: "/editar/:documento",
    element: (
      <PrivateRoute>
        <EditEmployee />
      </PrivateRoute>
    ),
  },
  {
    path: "/controle",
    element: (
      <PrivateRoute>
        <EntryControl />
      </PrivateRoute>
    ),
  },
  {
    path: "/visitantes",
    element: (
      <PrivateRoute>
        <Visitors />
      </PrivateRoute>
    ),
  },
  {
    path: "/adicionarvisitante",
    element: (
      <PrivateRoute>
        <AddVisitor />
      </PrivateRoute>
    ),
  },
  {
    path: "/cestabasica",
    element: (
      <PrivateRoute>
        <BasicBasket />
      </PrivateRoute>
    ),
  },
  {
    path: "/relatorios",
    element: (
      <PrivateRoute>
        <Report />
      </PrivateRoute>
    ),
  },
  // fallback
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
