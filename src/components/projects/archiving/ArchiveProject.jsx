export default function ArchiveProject({ project, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="archive-project-title"
        aria-describedby="archive-project-description"
        className="w-full max-w-md overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 bg-red-600 px-6 py-5 text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7h18v13H3zM2 4h20v3H2zM10 11h4" />
            </svg>
          </span>
          <h2 id="archive-project-title" className="text-lg font-bold">
            {project.archived ? "Desarquivar projeto" : "Arquivar projeto"}
          </h2>
        </div>
        <div className="p-6">
          <p id="archive-project-description" className="text-sm leading-6 text-gray-600">
            {project.archived
              ? `"${project.name}" voltará para os projetos ativos.`
              : `"${project.name}" sairá da lista de ativos. Você poderá desarquivá-lo depois.`}
          </p>
        </div>
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
          >
            {project.archived ? "Desarquivar" : "Arquivar"}
          </button>
        </div>
      </div>
    </div>
  );
}