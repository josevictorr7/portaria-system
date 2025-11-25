import { X } from "lucide-react";

function VisitorDetails({ show, visitor, onClose }) {
  if (!show || !visitor) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[450px] rounded-2xl shadow-xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Detalhes do Visitante
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 font-medium">Nome</p>
            <p className="text-lg font-semibold text-gray-800">
              {visitor.nome}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Documento</p>
            <p className="text-gray-700">{visitor.cpf || "—"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Empresa</p>
            <p className="text-gray-700">{visitor.empresa || "—"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Motivo</p>
            <p className="text-gray-700">{visitor.motivoVisita || "—"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Horário de Entrada</p>
            <p className="text-gray-700">
              {visitor.dataEntrada
                ? new Date(visitor.dataEntrada).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Horário de Saída</p>
            <p className="text-gray-700">
              {visitor.dataSaida
                ? new Date(visitor.dataSaida).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <p
              className={`font-semibold ${
                visitor.presente ? "text-green-600" : "text-red-500"
              }`}
            >
              {visitor.presente ? "Presente" : "Ausente"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VisitorDetails;
