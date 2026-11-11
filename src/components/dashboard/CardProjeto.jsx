import { useNavigate } from "react-router";

export default function CardProjeto({ titulo, progresso, descricao }) {
  const navigate = useNavigate();

  const handleAcessar = () => {
    // navega para a rota
    navigate(`/projeto/${encodeURIComponent(titulo)}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800">{titulo}</h3>
        {/* Ícones... */}
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
          onClick={handleAcessar} //navegação
          className="w-full py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          Acessar Projeto
        </button>
      </div>
    </div>
  );
}