export default function DashboardHeader({ onCriar }) {
  return (
    <header className="bg-red-600 px-8 py-6 flex justify-between items-center text-white shadow-sm">
      <div>
        <h1 className="text-2xl font-bold">Meus Projetos</h1>
        <p className="text-red-100 text-sm mt-1">
          Gerencie e acompanhe o progresso de suas equipes.
        </p>
      </div>
      <button
        onClick={onCriar}
        className="bg-white text-red-600 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-red-50 transition-colors"
      >
        + Criar Novo Projeto
      </button>
    </header>
  );
}