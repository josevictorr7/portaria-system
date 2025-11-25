import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PhotoInput from "../components/PhotoInput";
import { IMaskInput } from "react-imask";
import AddVehicle from "../components/AddVehicle";
import { Trash2 } from "lucide-react";
import api from "../services/api";

function AddEmployee() {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showVehicle, setShowVehicle] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const openVehicle = () => setShowVehicle(true);

  const handleAdd = async () => {
    try {
      const funcionario = {
        nome: name,
        documento: cpf,
        fotoUrl: photo,
        ativo: true,
        veiculos: vehicles.map((v) => ({
          modelo: v.modelo, // continua enviando 'nome' como 'modelo' no back
          placa: v.placa,
          cor: v.cor,
        })),
      };

      await api.criarFuncionario(funcionario);

      alert("Funcionário adicionado com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert("Erro ao adicionar funcionário. Verifique o console.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Adicionar Funcionário</h2>

          <PhotoInput onChange={setPhoto} />

          <InputField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome"
          />

          <p className="text-gray-700 my-1">Documento</p>
          <IMaskInput
            mask="000.000.000-00"
            value={cpf}
            onAccept={(value) => setCpf(value)}
            placeholder="Digite o CPF"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={openVehicle}
            className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Adicionar veículo
          </button>

          <div className="mt-4 space-y-2 w-full max-w-md">
            {vehicles.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border border-gray-300 p-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {v.foto && (
                    <img
                      src={v.foto}
                      alt={v.nome}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{v.nome}</p>
                    <p className="text-gray-500 text-sm">{v.placa}</p>
                    <p className="text-gray-500 text-sm">{v.cor}</p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setVehicles((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="text-red-600 hover:text-red-800 mr-2 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Voltar
            </button>

            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <AddVehicle
        show={showVehicle}
        onClose={() => setShowVehicle(false)}
        onAdd={(vehicle) => {
          setVehicles((prev) => [...prev, vehicle]);
          setShowVehicle(false);
        }}
      />
    </div>
  );
}

export default AddEmployee;
