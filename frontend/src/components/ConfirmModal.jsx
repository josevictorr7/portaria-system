import { registrarSaida, deletarVisitante, criarOuAtualizarVisitante } from "../services/visitantes";

export default function ConfirmModal({ show, onClose, onConfirm, func, text, title, actionType }) {
  // actionType: "entrada", "saida" ou "deletar"
  if (!show || !func) return null;

  const handleConfirm = async () => {
    try {
      let atualizado;

      if (actionType === "entrada") {
        // Para registrar entrada, usa o mesmo objeto que o Reason
        const visitanteData = {
          id: func.id || undefined,
          nome: func.name,
          cpf: func.doc || "",
          empresa: func.empresa || "",
          motivoVisita: func.motivoVisita || "",
          descricao: func.descricao || "",
          vehicle: func.vehicle || "",
        };
        atualizado = await criarOuAtualizarVisitante(visitanteData);
      } else if (actionType === "saida") {
        atualizado = await registrarSaida(func.id);
      } else if (actionType === "deletar") {
        await deletarVisitante(func.id);
      }

      // Passa de volta para o componente pai
      onConfirm(atualizado);
    } catch (error) {
      console.error("Erro ao processar ação:", error);
      alert("Ocorreu um erro. Verifique o console e tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{text}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white font-semibold cursor-pointer transition-colors ${
              actionType === "entrada" ? "bg-blue-600 hover:bg-blue-700" :
              actionType === "saida" ? "bg-red-500 hover:bg-red-600" :
              "bg-green-500 hover:bg-green-600"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
