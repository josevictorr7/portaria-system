import { useState } from "react";
import InputField from "./InputField";
import { IMaskInput } from "react-imask";
import { useDropzone } from "react-dropzone";

function AddVehicle({ show, onClose, onAdd }) {
  if (!show) return null;

  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState(""); // era name
  const [cor, setCor] = useState("");
  const [foto, setFoto] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFoto(URL.createObjectURL(file));
    },
  });

  const handleAdd = () => {
    // ✅ Mantém o nome do campo como "nome" no envio ao backend
    onAdd({ modelo, placa, cor, foto });
  };

  return (
    <div className="w-full h-full fixed flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="fixed w-[600px] h-[600px] rounded-2xl shadow bg-white top-auto overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="w-[400px] space-y-4">
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer
                        bg-gray-50 hover:bg-blue-50 transition-all duration-200 mt-8 shadow-sm"
            >
              <input {...getInputProps()} />
              <svg
                className="w-10 h-10 mb-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v4h16v-4M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              <p className="text-gray-600 text-center font-medium">
                Clique ou arraste a imagem do veículo aqui
              </p>
            </div>

            {foto && (
              <img
                src={foto}
                alt="Preview do veículo"
                className="w-40 h-40 object-cover mt-4 rounded-lg shadow-md border"
              />
            )}

            <InputField
              label="Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Digite o modelo do veículo"
            />

            <InputField
              label="Cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              placeholder="Digite a cor do veículo"
            />

            <p className="text-gray-700 my-1">Placa</p>
            <IMaskInput
              mask="XXXXXXX"
              definitions={{ X: /[A-Z0-9]/ }}
              prepare={(str) => (str || "").toUpperCase()}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a placa do veículo"
              value={placa}
              onAccept={(value) => setPlaca(value)}
            />
          </div>
        </div>

        <div className="flex justify-between m-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
          >
            Voltar
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={handleAdd}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle;
