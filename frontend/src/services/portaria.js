import axios from "axios";

const API_URL = "http://localhost:8080/api/portaria";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// 🔹 Registrar entrada
export const registrarEntrada = async (documento) => {
  try {
    const response = await axios.post(
      `${API_URL}/entrada`,
      { identificador: documento },
      config()
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar entrada:", error);
    throw error;
  }
};

// 🔹 Registrar saída
export const registrarSaida = async (documento) => {
  try {
    const response = await axios.put(
      `${API_URL}/saida`,
      { identificador: documento },
      config()
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar saída:", error);
    throw error;
  }
};

// 🔹 Listar funcionários com entrada ativa
// Backend agora retorna lista de documentos (strings)
export const listarEntradasAtivas = async () => {
  try {
    const response = await axios.get(`${API_URL}/ativos`, config());

    // Garante que sempre retornará um array (mesmo se vier null/undefined)
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao listar entradas ativas:", error);
    return [];
  }
};
