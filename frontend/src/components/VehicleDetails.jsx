import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VehicleDetails({ veiculos, onBack }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="veiculos"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-between h-full bg-white p-4 rounded shadow-md"
      >
        <div>
          <div className="flex items-center mb-4">
            <button onClick={onBack} className="flex justify-center items-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-semibold ml-3">Veículos</h2>
          </div>

          <div className="space-y-3">
            {veiculos && veiculos.length > 0 ? (
              veiculos.map((v, i) => (
                <div key={i} className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition">
                  <p className="font-semibold">{v.nome || v.modelo}</p>
                  <p className="text-gray-500 text-sm">Placa: {v.placa}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">Nenhum veículo cadastrado.</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
