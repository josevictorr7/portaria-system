import axios from "axios";

const API_URL = "http://localhost:8080/api/cestas";

export const uploadBeneficiarios = async (file) => {
  const token = localStorage.getItem("token"); // JWT armazenado no login

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`, // 🔒 envia o token de autenticação
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // lista de beneficiários retornados pelo backend
  } catch (error) {
    console.error("Erro ao enviar arquivo de cesta básica:", error);
    throw error;
  }
};
