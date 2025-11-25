import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Report() {
  const [isOpen, setIsOpen] = useState(true);
  const [month, setMonth] = useState("");
  const [reports, setReports] = useState([]);

  const handleGenerate = async () => {
    if (!month) {
      alert("Por favor, selecione um mês antes de gerar o relatório.");
      return;
    }

    const [ano, mes] = month.split("-");

    try {
      const response = await fetch(
        `http://localhost:8080/api/relatorios/frequencia?mes=${parseInt(mes)}&ano=${parseInt(ano)}`
      );
      const data = await response.json();

      // Apenas informações principais para exibir na tela
      const dadosTela = data.map(r => ({
        nome: r.nome,
        cpf: r.cpf,
        diasTrabalhados: r.diasTrabalhados,
        faltas: r.faltas
      }));

      setReports(dadosTela);
      alert(`Relatório de frequência do mês ${mes}/${ano} gerado com sucesso!`);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Ocorreu um erro ao gerar o relatório.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Relatórios</h1>
            <p className="text-gray-600 mb-4">Geração de relatórios de frequência</p>
          </div>
        </div>

        <div className="w-full h-[200px] rounded-2xl p-4 shadow-md border border-gray-200 bg-white">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">Filtros</h1>
          <div className="flex justify-evenly">
            <div className="p-4">
              <label className="block mb-2 font-medium text-gray-800">Escolha o mês:</label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <button
                onClick={handleGenerate}
                className="px-10 py-2 bg-blue-600 text-white font-semibold rounded-lg 
                           hover:bg-blue-900 hover:scale-105 hover:shadow-lg 
                           transition-all duration-200 my-12"
              >
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequência dos Funcionários</h2>

          <div className="grid grid-cols-4 bg-gray-200 p-3 font-semibold text-gray-700 rounded-t-md">
            <div>Nome</div>
            <div>Documento</div>
            <div>Dias Trabalhados</div>
            <div>Faltas</div>
          </div>

          {reports.length > 0 ? (
            reports.map((r, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-800">{r.nome}</div>
                <div className="text-gray-600">{r.cpf}</div>
                <div className="font-medium text-gray-800">{r.diasTrabalhados}</div>
                <div className="font-medium text-gray-800">{r.faltas}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center p-4">Nenhum relatório disponível.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Report;
