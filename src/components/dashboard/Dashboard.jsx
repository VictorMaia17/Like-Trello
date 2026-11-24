import { useState } from "react";
// ⚠️ CORREÇÃO: Adicionado "../" extra para voltar até a raiz src/
import useProjetos from "../../hooks/useProjetos.js"; 
import { ATIVIDADE_SEMANAL, TAREFAS_SIMULADAS } from "../../mocks/dashboardMock";

// ⚠️ CORREÇÃO: Como esses componentes estão na MESMA pasta que o Dashboard.jsx, usamos "./"
import DashboardHeader from "./DashboardHeader";
import ProjetosGrid from "./ProjetosGrid";
import NovoProjetoModal from "./NovoProjetoModal";
import GraficoAtividadeSemanal from "./GraficoAtividadeSemanal";
import CalendarioTarefas from "./CalendarioTarefas";

export default function Dashboard() {
  const { projetos, loading, erro, criar, recarregar } = useProjetos();
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DashboardHeader onCriar={() => setModalAberto(true)} />

      <main className="max-w-7xl mx-auto p-8">
        <ProjetosGrid projetos={projetos} loading={loading} erro={erro} onRetry={recarregar} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoAtividadeSemanal dados={ATIVIDADE_SEMANAL} />
          <CalendarioTarefas tarefasPorDia={TAREFAS_SIMULADAS} />
        </div>
      </main>

      <NovoProjetoModal
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvar={criar}
      />
    </div>
  );
}