export default function ErrorMessage({ mensagem, onTentarNovamente }) {
  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center justify-between gap-4"
    >
      <span className="text-sm">{mensagem}</span>
      {onTentarNovamente && (
        <button
          onClick={onTentarNovamente}
          className="text-sm font-medium underline hover:text-red-900"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}