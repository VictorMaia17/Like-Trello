import { useNavigate } from "react-router";

export default function CardProjeto({ id, titulo, progresso, descricao, archived, onArchive }) {
  const navigate = useNavigate();

  const handleAcessar = () => {
    if (archived) return;
    navigate(`/projeto/${encodeURIComponent(titulo)}`);
  };

  const handleEditar = () => {
    if (archived) return;
    navigate(`/projects/${id}/edit`);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-lg font-bold text-gray-800">{titulo}</h3>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleEditar}
            disabled={Boolean(archived)}
            aria-label={`Editar ${titulo}`}
            title={`Editar ${titulo}`}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-500"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-9.5 9.5a1 1 0 0 1-.465.263l-3.5.875a.5.5 0 0 1-.606-.606l.875-3.5a1 1 0 0 1 .263-.465l9.5-9.5ZM12.172 5 5 12.172V14h1.828L14 6.828 12.172 5Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onArchive}
            aria-label={`${archived ? "Desarquivar" : "Arquivar"} ${titulo}`}
            title={`${archived ? "Desarquivar" : "Arquivar"} ${titulo}`}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7h18v13H3zM2 4h20v3H2zM10 11h4" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2">{descricao}</p>
      <div className="mt-auto">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-gray-600">Progresso</span>
          <span className="font-bold text-gray-800">{progresso}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${progresso}%` }}></div>
        </div>

        <button
          type="button"
          onClick={handleAcessar}
          disabled={Boolean(archived)}
          className="w-full py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-600"
        >
          Acessar Projeto
        </button>
      </div>
    </div>
  );
}