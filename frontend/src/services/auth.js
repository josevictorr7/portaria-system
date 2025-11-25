import axios from "axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    return res.data.token;
  } catch (err) {
    console.error("Erro no login:", err);
    throw err;
  }
};
