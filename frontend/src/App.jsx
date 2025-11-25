import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import DashInfo from "./components/DashInfo";
import Recent from "./components/Recent";
import { Users, CheckCircle, XCircle, Clipboard } from "lucide-react";
import api from "./services/api";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getDashboard();
        setDashboard(response);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    };
    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <p className="text-gray-500 text-lg">Carregando dados da portaria...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-4">Visão geral da portaria</p>

        <div className="flex space-x-7 my-9">
          <DashInfo
            icon={Users}
            text="Total de Funcionários"
            num={dashboard.totalFuncionarios}
            color="#1D4ED8"
            to="/funcionarios"
          />
          <DashInfo
            icon={CheckCircle}
            text="Presentes"
            num={dashboard.presentes}
            color="#10B981"
            to="/controle"
          />
          <DashInfo
            icon={XCircle}
            text="Ausentes"
            num={dashboard.ausentes}
            color="#EF4444"
            to="/controle"
          />
          <DashInfo
            icon={Clipboard}
            text="Registros Hoje"
            num={dashboard.registrosHoje}
            color="#F59E0B"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Atividade recente
        </h1>
        <Recent
          records={dashboard.atividadesRecentes.map((item) => ({
            name: item.nomeFuncionario,
            time: item.horario,
            entry: item.entrada,
          }))}
        />
      </main>
    </div>
  );
}
