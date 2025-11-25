import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔑 Headers com token JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = {
  // =======================
  // AUTH
  // =======================
  login: async (username, password) => {
    const response = await API.post("/auth/login", { username, password });
    return response.data;
  },

  // =======================
  // DASHBOARD
  // =======================
  getDashboard: async () => {
    const response = await API.get("/dashboard", { headers: getAuthHeaders() });
    return response.data;
  },

  // =======================
  // VISITANTES
  // =======================
  getVisitantes: async () => {
    const response = await API.get("/visitantes", { headers: getAuthHeaders() });
    return response.data;
  },

  criarVisitante: async (visitante) => {
    const response = await API.post("/visitantes", visitante, { headers: getAuthHeaders() });
    return response.data;
  },

  atualizarVisitante: async (id, visitante) => {
    const response = await API.put(`/visitantes/${id}/saida`, visitante, { headers: getAuthHeaders() });
    return response.data;
  },

  deletarVisitante: async (id) => {
    await API.delete(`/visitantes/${id}`, { headers: getAuthHeaders() });
  },

  // =======================
  // FUNCIONÁRIOS
  // =======================
  getFuncionarios: async () => {
    const response = await API.get("/funcionarios", { headers: getAuthHeaders() });
    return response.data;
  },

  buscarFuncionarioPorCpf: async (documento) => {
    const response = await API.get(`/funcionarios/documento/${documento}`, {
      headers: getAuthHeaders(),
    });
    return response.data; // já retorna o objeto direto
  },

  criarFuncionario: async (funcionario) => {
    const response = await API.post("/funcionarios", funcionario, { headers: getAuthHeaders() });
    return response.data;
  },

  atualizarFuncionario: async (id, funcionario) => {
    const response = await API.put(`/funcionarios/${id}`, funcionario, { headers: getAuthHeaders() });
    return response.data;
  },

  deletarFuncionario: async (id) => {
    await API.delete(`/funcionarios/${id}`, { headers: getAuthHeaders() });
  },
};

export default api;
