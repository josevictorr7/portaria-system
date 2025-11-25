import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import api from "../services/api";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const data = await api.login(usuario, senha);
      localStorage.setItem("token", data.token);
      navigate("/paginainicial");
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center w-1/2 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col w-3/4 max-w-sm">
          <label className="text-gray-700 font-semibold mb-1">Usuário</label>
          <input
            type="text"
            placeholder="Digite seu Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <label className="text-gray-700 font-semibold mb-1">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-6 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          {erro && <p className="text-red-500 mb-4">{erro}</p>}

          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
          >
            <LogIn size={18} /> Entrar
          </button>
        </form>
      </div>

      <div className="w-1/2 relative bg-gradient-to-t from-blue-600 via-blue-900 to-blue-950 text-white flex flex-col justify-start items-center p-10 overflow-hidden">
        <img
          draggable="false"
          src={logo}
          alt="Logo"
          className="h-[200px] w-[220px] mt-3 select-none transition-transform duration-500 ease-in-out hover:scale-105 hover:-translate-y-2"
        />

        <p className="text-white text-lg font-semibold mb-6 select-none">
          Controle de acesso moderno e seguro
        </p>
      </div>
    </div>
  );
}

export default Login;
