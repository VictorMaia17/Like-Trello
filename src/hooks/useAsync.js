import { useState, useCallback } from "react";

export function useAsync(funcao) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const executar = useCallback(
    async (...args) => {
      setLoading(true);
      setErro(null);
      try {
        return await funcao(...args);
      } catch (e) {
        setErro(e.message || "Algo deu errado. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [funcao]
  );

  return { executar, loading, erro };
}