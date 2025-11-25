import {
  Home,
  Users,
  Clock,
  FileText,
  ShoppingBasket,
  LogOut,
  Menu,
  UserCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove o token
    navigate("/", { replace: true }); // redireciona para login
  };

  return (
    <div
      className={`flex flex-col bg-gray-900 text-gray-100 transition-all duration-300 ${
        isOpen ? "w-64" : "w-17"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2
          className={`text-xl flex items-center font-semibold transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {isOpen && (
            <img
              src={logo}
              alt="Logo"
              draggable="false"
              className="h-[35px] w-[150px]"
            />
          )}
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 cursor-pointer rounded hover:bg-blue-950"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          icon={<Home size={20} />}
          label="Dashboard"
          isOpen={isOpen}
          to="/paginainicial"
        />
        <SidebarLink
          icon={<Clock size={20} />}
          label="Controle de Entrada"
          isOpen={isOpen}
          to="/controle"
        />
        <SidebarLink
          icon={<Users size={20} />}
          label="Funcionários"
          isOpen={isOpen}
          to="/funcionarios"
        />
        <SidebarLink
          icon={<UserCheck size={20} />}
          label="Visitantes"
          isOpen={isOpen}
          to="/visitantes"
        />
        <SidebarLink
          icon={<FileText size={20} />}
          label="Relatórios"
          isOpen={isOpen}
          to="/relatorios"
        />
        <SidebarLink
          icon={<ShoppingBasket size={20} />}
          label="Cesta Básica"
          isOpen={isOpen}
          to="/cestabasica"
        />
      </nav>

      <div className="p-4 border-t border-gray-700">
        {/* Botão de logout funcional */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 w-full rounded hover:bg-blue-950 transition-colors"
        >
          <span className="min-w-[24px] flex justify-center">
            <LogOut size={20} />
          </span>
          <span
            className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
              isOpen ? "w-36 opacity-100" : "w-0 opacity-0"
            }`}
          >
            Sair
          </span>
        </button>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, isOpen, to }) {
  return (
    <Link
      to={to}
      className="flex items-center p-2 rounded hover:bg-blue-950 transition-colors"
    >
      <span className="min-w-[24px] flex justify-center">{icon}</span>
      <span
        className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
          isOpen ? "w-36 opacity-100" : "w-0 opacity-0"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export default Sidebar;
