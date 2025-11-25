import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";
import axios from "axios";

function BasicBasket() {
  const [isOpen, setIsOpen] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [fileName, setFileName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  // 🔒 Cabeçalhos de autenticação com JWT
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Acesso negado! Faça login novamente.");
      throw new Error("Token JWT não encontrado");
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
  };

  // 📂 Ao selecionar o arquivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Por favor, envie um arquivo .txt");
      return;
    }

    setFileName(file.name);
    setPendingFile(file);
    setShowConfirm(true);
  };

  // 🚀 Enviar arquivo para o backend
  const handleConfirmAdd = async () => {
    if (!pendingFile) return;

    const formData = new FormData();
    formData.append("file", pendingFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/cestas/upload",
        formData,
        { headers: getAuthHeaders() }
      );

      console.log("📦 Resposta do backend:", response.data);

      // ✅ Garante que seja um array
      if (Array.isArray(response.data)) {
        setBeneficiaries(response.data);
      } else {
        console.error("⚠️ Resposta inesperada do servidor:", response.data);
        alert("O servidor retornou uma resposta inesperada.");
        setBeneficiaries([]);
      }

      setShowConfirm(false);
    } catch (error) {
      console.error("❌ Erro ao enviar arquivo:", error);

      if (error.response?.status === 403 || error.response?.status === 401) {
        alert("Sessão expirada! Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("Erro ao processar o arquivo. Verifique o formato e tente novamente.");
      }

      setShowConfirm(false);
      setBeneficiaries([]);
    }
  };

  const handleCancelAdd = () => {
    setPendingFile(null);
    setShowConfirm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Cesta Básica</h1>
        <p className="text-gray-600 mb-6">
          Verifique os funcionários com direito ao benefício.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Total de Beneficiários
            </h2>
            <p className="text-5xl font-bold text-blue-600">
              {Array.isArray(beneficiaries) ? beneficiaries.length : 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enviar Lista de Beneficiários
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Envie um arquivo <strong>.txt</strong> com os nomes separados por
              vírgula ou linha.
            </p>

            <div className="flex flex-col items-start gap-3">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-700
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-600 file:text-white
                           hover:file:bg-blue-700 cursor-pointer"
              />
              {fileName && (
                <p className="text-sm text-gray-500">
                  Arquivo carregado:{" "}
                  <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {Array.isArray(beneficiaries) && beneficiaries.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Funcionários com direito à Cesta Básica
            </h2>

            <div className="grid grid-cols-[2fr_1fr] bg-gray-200 p-3 font-semibold text-gray-700 rounded-t-md">
              <div>Nome</div>
              <div className="text-center">Documento</div>
            </div>

            {beneficiaries.map((emp, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr] items-center p-3 border-b border-gray-100 hover:bg-green-50 transition"
              >
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <span className="px-2 py-1 text-xs font-semibold bg-green-600 text-white rounded-md">
                    Beneficiário
                  </span>
                  {emp.nome || "Sem nome"}
                </div>
                <div className="text-gray-600 text-center">
                  {emp.cpf || emp.documento || "—"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            Nenhum beneficiário listado ainda.
          </p>
        )}
      </main>

      {showConfirm && (
        <ConfirmModal
          show={showConfirm}
          func={{ entry: false }}
          title="Confirmar Envio"
          text={`Enviar o arquivo "${fileName}" para verificar beneficiários?`}
          color="#2563EB"
          onClose={handleCancelAdd}
          onConfirm={handleConfirmAdd}
        />
      )}
    </div>
  );
}

export default BasicBasket;
