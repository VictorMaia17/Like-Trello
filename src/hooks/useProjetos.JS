import { useCallback, useEffect, useState } from "react";
import { listarProjetos, criarProjeto } from "../services/ProjetoService";

export default function useProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      setProjetos(await listarProjetos());
    } catch (e) {
      setErro("Não foi possível carregar os projetos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (nome) => {
    await criarProjeto(nome);
    await carregar();
  };

  return { projetos, loading, erro, criar, recarregar: carregar };
}