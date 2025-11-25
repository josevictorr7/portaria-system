// src/pages/Employees.jsx
import { Plus, Edit, Trash2, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import EmployeeDetails from "../components/EmployeeDetails";
import api from "../services/api";

function Employees() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Buscar funcionários do back-end
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const funcionariosData = await api.getFuncionarios();
        const data = (funcionariosData || []).map((f) => ({
          id: f.id,
          name: f.nome || f.name || "",
          cpf: f.cpf || f.documento || "",
          fotoUrl: f.foto || f.fotoUrl || f.photo || "",
          veiculos:
            (f.veiculos || []).map((v) => ({
              nome: v.nome || v.modelo || v.name || "",
              placa: v.placa || v.plate || "",
              cor: v.cor || v.color || "",
              foto: v.foto || v.fotoUrl || null,
            })) || [],
        }));
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        alert("Erro ao carregar lista de funcionários. Verifique sua conexão ou autenticação.");
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const openDetails = (func) => {
    setSelectedFunc(func);
    setShowDetails(true);
  };

  const handleOpenModal = (func) => {
    setSelectedFunc(func);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedFunc?.id) return setShowModal(false);
    try {
      await api.deletarFuncionario(selectedFunc.id);
      setFuncionarios((prev) => prev.filter((f) => f.id !== selectedFunc.id));
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      alert("Erro ao excluir funcionário.");
    } finally {
      setShowModal(false);
      setShowDetails(false);
      setSelectedFunc(null);
    }
  };

  const filtered = funcionarios.filter((f) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (f.name || "").toLowerCase().includes(q) ||
      (f.cpf || "").toLowerCase().includes(q) ||
      (f.veiculos || []).some((v) => (v.placa || "").toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando funcionários...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 p-6 transition-all duration-300">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Funcionários</h1>
            <p className="text-gray-600 mb-4">Gerencie os colaboradores da empresa</p>
          </div>
          <Link
            className="flex items-center hover:bg-blue-900 px-5 py-2 rounded-2xl bg-blue-600 text-white font-semibold cursor-pointer m-3"
            to="/adicionarfuncionario"
          >
            <Plus className="mr-2" /> Adicionar Funcionário
          </Link>
        </div>

        <div className="m-5 w-[1000px] rounded-md">
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, cpf ou placa"
          />

          <div className="grid grid-cols-4 bg-gray-200 p-3 font-semibold text-gray-700 my-2">
            <div>Nome</div>
            <div>CPF</div>
            <div>Veículo</div>
            <div className="text-center">Ações</div>
          </div>

          {filtered.length > 0 ? (
            filtered.map((f) => (
              <div
                key={f.id}
                className="group grid grid-cols-4 items-center p-3 bg-white cursor-pointer rounded-md
                           transform transition-all duration-300
                           hover:bg-blue-600 hover:text-white hover:scale-[1.02] hover:shadow-lg"
                onClick={() => openDetails(f)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white
                                  transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                    <User size={20} />
                  </div>
                  <p className="font-medium transition-all duration-300">{f.name}</p>
                </div>

                <p>{f.cpf}</p>
                <p>{(f.veiculos && f.veiculos[0]?.placa) || "—"}</p>

                <div className="flex justify-center">
                  {/* ✅ codifica CPF para evitar erros com pontos e traços */}
                  <Link
                    to={`/editar/${encodeURIComponent(f.cpf)}`}
                    className="text-blue-600 mr-3 flex items-center transition-all duration-300 group-hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit size={18} />
                  </Link>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(f);
                    }}
                    className="text-red-600 group-hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">
              Nenhum funcionário cadastrado.
            </p>
          )}
        </div>
      </main>

      {selectedFunc && (
        <ConfirmModal
          show={showModal}
          func={selectedFunc}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          text={`Deseja realmente apagar ${selectedFunc?.name}?`}
          color="#EF4444"
          title="Apagar Funcionário"
        />
      )}

      {selectedFunc && (
        <EmployeeDetails
          show={showDetails}
          func={selectedFunc}
          onClose={() => setShowDetails(false)}
          onDelete={() => handleOpenModal(selectedFunc)}
        />
      )}
    </div>
  );
}

export default Employees;
