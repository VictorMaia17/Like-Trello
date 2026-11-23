import { useState, useCallback } from "react";
import { ToastContext } from "../../contexts/toastContext";

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const mostrarToast = useCallback((mensagem, tipo = "sucesso") => {
    const id = Date.now() + Math.random();
    setToasts((atual) => [...atual, { id, mensagem, tipo }]);
    // some sozinho depois de 3,5 segundos
    setTimeout(() => {
      setToasts((atual) => atual.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`px-4 py-3 rounded-lg shadow-lg text-sm text-white ${
              t.tipo === "erro" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {t.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
