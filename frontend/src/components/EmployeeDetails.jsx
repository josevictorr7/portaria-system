import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardDetails from "./CardDetails";

function EmployeeDetails({ show, onClose, func, onDelete }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleEdit = () => {
    navigate(`/editar/${encodeURIComponent(func.cpf)}`);
  };

  const handleClose = () => {
    onClose();
  };

  const veiculos = func?.veiculos || [];

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50"
      onClick={handleClose}
    >
      <div
        className="relative w-[1200px] h-[700px] bg-gray-100 rounded-lg shadow-xl overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LADO ESQUERDO - DETALHES DO FUNCIONÁRIO */}
        <div className="w-[400px] flex flex-col space-y-4 p-4 pr-0 h-full">
          <div className="flex items-center space-x-4 h-[60px] bg-white rounded-lg shadow px-3">
            <button
              className="flex justify-center w-8 h-8 items-center cursor-pointer border border-gray-300 rounded-full transform transition-transform duration-100 hover:scale-110"
              onClick={onClose}
            >
              <ArrowLeft />
            </button>
            <h1 className="text-2xl font-semibold">Detalhes</h1>
          </div>

          <div className="bg-white rounded-lg shadow flex-1 flex flex-col justify-between overflow-hidden">
            <div className="border-b border-gray-200 w-full h-[200px] flex justify-center items-center mb-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
                <h1 className="font-bold text-lg">{func.nome || func.name}</h1>
                <p className="text-gray-500">Funcionário</p>
              </div>
            </div>

            <div className="px-4">
              <p className="text-gray-600 font-bold">Informações</p>
              <div className="space-y-3 border-1 border-b-0 border-gray-200 rounded pt-2">
                <CardDetails title="Nome" info={func.nome || func.name} />
                <CardDetails title="Documento (CPF)" info={func.cpf} />
                <CardDetails
                  title="Status"
                  info={func.ativo ? "Ativo" : "Inativo"}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4 px-4 pb-4">
              <button
                onClick={handleEdit}
                className="flex-1 bg-white text-blue-600 border border-blue-600 rounded-lg px-4 py-2 font-semibold hover:bg-blue-50 transition cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(func)}
                className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>

        {/* LADO DIREITO - VEÍCULOS */}
        <div className="flex-1 flex flex-col p-5 h-full overflow-auto">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 overflow-auto border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Veículos</h2>

            {veiculos.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {veiculos.map((veiculo, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center justify-between hover:shadow-md transition"
                  >
                    <div className="w-full h-28 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={veiculo.foto || "https://via.placeholder.com/150"}
                        alt={veiculo.nome || veiculo.modelo}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {veiculo.modelo || veiculo.nome}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Placa: <span className="font-medium">{veiculo.placa}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      Cor: <span className="font-medium">{veiculo.cor}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">
                  Nenhum veículo cadastrado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
