import { Link } from "react-router";
import CardProjeto from "./CardProjeto";

export default function ProjetosGrid({ projetos, loading, erro, onRetry }) {
  if (loading) return <p className="text-gray-500 mb-8">Carregando projetos...</p>;

  if (erro)
    return (
      <div className="mb-8 text-red-600">
        {erro}{" "}
        <button onClick={onRetry} className="underline font-semibold">
          Tentar novamente
        </button>
      </div>
    );

  if (projetos.length === 0)
    return <p className="text-gray-500 mb-8">Você ainda não tem projetos. Crie o primeiro!</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {projetos.map((p) => (
        <Link key={p.id} to={`/projeto/${p.id}`}>
          <CardProjeto
            titulo={p.name}
            progresso={0} // a API ainda não retorna progresso
            descricao={`Criado em ${new Date(p.createdAt).toLocaleDateString("pt-BR")}`}
          />
        </Link>
      ))}
    </div>
  );
}