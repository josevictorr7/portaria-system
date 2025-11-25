import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // precisa instalar com: npm install jwt-decode

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Caso não tenha token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decodifica o token
    const decoded = jwtDecode(token);

    // Verifica se o token expirou
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("Token expirado, redirecionando para login...");
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    // Tudo certo → renderiza o conteúdo protegido
    return children;
  } catch (error) {
    console.error("Token inválido:", error);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
