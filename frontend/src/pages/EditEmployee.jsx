import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PhotoInput from "../components/PhotoInput";
import { IMaskInput } from "react-imask";
import AddVehicle from "../components/AddVehicle";
import { Trash2 } from "lucide-react";
import api from "../services/api";

export default function EditEmployee() {
  const { documento } = useParams(); // CPF vindo da rota
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  // Estados principais
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [ativo, setAtivo] = useState(true);
  const [veiculos, setVeiculos] = useState([]);
  const [showVehicle, setShowVehicle] = useState(false);

  // ===============================
  // 🔹 Buscar funcionário por CPF
  // ===============================
  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        if (!documento) return;

        const funcionario = await api.buscarFuncionarioPorCpf(documento);

        if (!funcionario || !funcionario.id) {
          alert("Funcionário não encontrado!");
          navigate("/funcionarios");
          return;
        }

        setFuncionarioId(funcionario.id);
        setNome(funcionario.nome || "");
        setAtivo(funcionario.ativo ?? true);
        setVeiculos(funcionario.veiculos || []);
        setFotoUrl(funcionario.fotoUrl || funcionario.foto || null);
      } catch (err) {
        console.error("Erro ao buscar funcionário:", err);
        alert("Erro ao carregar funcionário. Verifique o servidor ou o token.");
        navigate("/funcionarios");
      }
    };

    fetchFuncionario();
  }, [documento, navigate]);

  // ===============================
  // 🔹 Atualizar foto
  // ===============================
  const handlePhotoChange = (file) => {
    setFotoUrl(file);
    setFotoPreview(file ? URL.createObjectURL(file) : null);
  };

  // ===============================
  // 🔹 Salvar alterações
  // ===============================
  const handleSave = async () => {
    try {
      if (!funcionarioId) {
        alert("Erro: ID do funcionário não encontrado!");
        return;
      }

      const funcionarioAtualizado = {
        nome,
        documento,
        ativo,
        fotoUrl,
        veiculos,
      };

      await api.atualizarFuncionario(funcionarioId, funcionarioAtualizado);

      alert("Funcionário atualizado com sucesso!");
      navigate("/funcionarios");
    } catch (err) {
      console.error("Erro ao salvar funcionário:", err);
      alert("Erro ao salvar funcionário. Verifique o token ou o servidor.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Editar Funcionário
          </h2>

          <PhotoInput
            onChange={handlePhotoChange}
            preview={fotoPreview || fotoUrl}
          />

          <InputField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
          />

          <p className="text-gray-600 my-1">Documento (CPF)</p>
          <IMaskInput
            mask="000.000.000-00"
            value={documento || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100 cursor-not-allowed"
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={ativo}
              onChange={() => setAtivo((prev) => !prev)}
            />
            <label className="text-gray-700">Funcionário ativo</label>
          </div>

          <button
            onClick={() => setShowVehicle(true)}
            className="px-4 py-2 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Adicionar veículo
          </button>

          <div className="mt-4 space-y-2 w-full max-w-md">
            {veiculos.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border border-gray-300 p-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {v.foto && (
                    <img
                      src={v.foto}
                      alt={v.modelo || v.nome}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{v.modelo || v.nome}</p>
                    <p className="text-gray-500 text-sm">Placa: {v.placa}</p>
                    <p className="text-gray-500 text-sm">Cor: {v.cor}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setVeiculos((prev) =>
                      prev.filter((_, index) => index !== i)
                    )
                  }
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Voltar
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>

      <AddVehicle
        show={showVehicle}
        onClose={() => setShowVehicle(false)}
        onAdd={(vehicle) => {
          setVeiculos((prev) => [...prev, vehicle]);
          setShowVehicle(false);
        }}
      />
    </div>
  );
}
