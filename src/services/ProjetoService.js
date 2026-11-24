import api from "./api";

// GET /api/v1/projects → [{ id, name, ownerId, createdAt }]
export const listarProjetos = async (page = 0, size = 20) => {
  const { data } = await api.get("/projects", { params: { page, size } });
  return data;
};

// POST /api/v1/projects { name } → { id }
export const criarProjeto = async (name) => {
  const { data } = await api.post("/projects", { name });
  return data;
};