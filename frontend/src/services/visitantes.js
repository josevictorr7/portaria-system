// src/services/visitantes.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/visitantes";

// Função para pegar o token JWT
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) console.warn("JWT não encontrado no localStorage!");
  return token;
};

// Config padrão para requisições com JWT
const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

// Listar todos visitantes
export const listarVisitantes = async () => {
  try {
    const res = await axios.get(API_URL, getConfig());
    return res.data;
  } catch (error) {
    console.error("Erro ao listar visitantes:", error.response?.data || error.message);
    throw error;
  }
};

// Criar novo visitante
export const criarVisitante = async (visitante) => {
  try {
    const res = await axios.post(API_URL, visitante, getConfig());
    return res.data;
  } catch (error) {
    console.error("Erro ao criar visitante:", error.response?.data || error.message);
    throw error;
  }
};

// Registrar entrada de visitante existente
export const registrarEntrada = async (id, visitante) => {
  if (!id) throw new Error("ID do visitante é obrigatório para registrar entrada.");
  try {
    const res = await axios.put(`${API_URL}/${id}/entrada`, visitante, getConfig());
    return res.data;
  } catch (error) {
    console.error(`Erro ao registrar entrada do visitante ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Registrar saída de visitante existente
export const registrarSaida = async (id) => {
  if (!id) throw new Error("ID do visitante é obrigatório para registrar saída.");
  try {
    const res = await axios.put(`${API_URL}/${id}/saida`, {}, getConfig());
    return res.data;
  } catch (error) {
    console.error(`Erro ao registrar saída do visitante ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Deletar visitante
export const deletarVisitante = async (id) => {
  if (!id) throw new Error("ID do visitante é obrigatório para deletar.");
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getConfig());
    return res.data;
  } catch (error) {
    console.error(`Erro ao deletar visitante ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Função "inteligente" que cria ou registra entrada automaticamente
export const criarOuAtualizarVisitante = async (visitante) => {
  if (visitante.id) {
    // Visitante existente → registrar entrada
    return await registrarEntrada(visitante.id, visitante);
  } else {
    // Novo visitante → criar
    return await criarVisitante(visitante);
  }
};
