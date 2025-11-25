import axios from "axios";

const API_URL = "http://localhost:8080/api/funcionarios";

// 🔑 Token do localStorage
const getToken = () => localStorage.getItem("token");

// ⚙️ Config padrão
const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

// 🔄 back → front
const mapFuncionarioToFront = (f) => ({
  id: f.id,
  name: f.nome,
  cpf: f.documento,
  foto: f.fotoUrl,
  ativo: f.ativo,
  veiculos:
    f.veiculos?.map((v) => ({
      nome: v.modelo,
      placa: v.placa,
      cor: v.cor,
      foto: v.fotoUrl,
    })) || [],
});

// 🔄 front → back
const mapFuncionarioToBack = (f) => ({
  nome: f.name,
  cpf: f.cpf,
  fotoUrl: f.foto,
  ativo: f.ativo ?? true,
  veiculos:
    f.veiculos?.map((v) => ({
      modelo: v.nome,
      placa: v.placa,
      cor: v.cor || "",
    })) || [],
});

export const listarFuncionarios = async () => {
  const res = await axios.get(API_URL, getConfig());
  return res.data.map(mapFuncionarioToFront);
};

export const criarFuncionario = async (funcionario) => {
  const res = await axios.post(API_URL, mapFuncionarioToBack(funcionario), getConfig());
  return mapFuncionarioToFront(res.data);
};

export const atualizarFuncionario = async (id, funcionario) => {
  const res = await axios.put(`${API_URL}/${id}`, mapFuncionarioToBack(funcionario), getConfig());
  return mapFuncionarioToFront(res.data);
};

export const deletarFuncionario = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getConfig());
  return res.data;
};
