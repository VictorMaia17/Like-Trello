import { useState } from "react";

export default function NovoProjetoModal({ aberto, onFechar, onSalvar }) {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  if (!aberto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nomeLimpo = nome.trim();
    if (nomeLimpo.length < 3 || nomeLimpo.length > 100) {
      setErro("O nome deve ter entre 3 e 100 caracteres.");
      return;
    }
    setSalvando(true);
    try {
      await onSalvar(nomeLimpo);
      setNome("");
      setErro("");
      onFechar();
    } catch {
      setErro("Não foi possível criar o projeto.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Novo projeto</h2>
        <input
          autoFocus
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do projeto"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-red-400"
        />
        {erro && <p className="text-sm text-red-600 mt-2">{erro}</p>}
        <div className="flex justify-end gap-2 mt-5">
          <button type="button" onClick={onFechar} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={salvando}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {salvando ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
}