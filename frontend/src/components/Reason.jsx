import { useState, useEffect } from "react";
import { criarOuAtualizarVisitante } from "../services/visitantes";

export default function Reason({ show, func, onClose, onConfirm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);

  // Resetar campos sempre que o modal for aberto
  useEffect(() => {
    if (show) {
      setTitle("");
      setDescription("");
      setEmpresa("");
    }
  }, [show]);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setEmpresa("");
    onClose();
  };

  const handleConfirm = async () => {
    if (!title.trim()) {
      alert("Por favor, preencha o motivo da visita.");
      return;
    }

    setLoading(true);

    // Monta os dados do visitante
    const visitanteData = {
      id: func.id || undefined, // Se existir, registra entrada; senão, cria novo
      nome: func.name,
      cpf: func.doc || "",
      empresa: empresa || "",
      motivoVisita: title,
      descricao: description || "",
      vehicle: func.vehicle || "",
    };

    try {
      // Chama o service que cria ou registra entrada
      const registrado = await criarOuAtualizarVisitante(visitanteData);

      // Retorna os dados atualizados para o componente pai
      onConfirm(
        registrado.motivoVisita,
        registrado.descricao,
        registrado.empresa,
        registrado.id // Retorna o ID atualizado
      );

      // Resetar campos após sucesso
      setTitle("");
      setDescription("");
      setEmpresa("");
    } catch (error) {
      console.error("Erro ao registrar entrada do visitante:", error);
      alert(
        "Não foi possível registrar a entrada. Verifique se você está logado e se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white w-[500px] rounded-2xl shadow-xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Registrar Entrada
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Motivo da Visita *
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entrega, Reunião, Visita técnica..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Descrição</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes adicionais (opcional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Empresa</p>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ex: Load Cargo Logísticas"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="cursor-pointer px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`cursor-pointer px-5 py-2 rounded-lg font-semibold text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
