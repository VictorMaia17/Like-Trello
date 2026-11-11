import { useState } from 'react';
import CardProjeto from '../components/dashboard/CardProjeto';

const TAREFAS_SIMULADAS = {
  11: ["Reunião de Alinhamento", "Revisar código PR #42"],
  15: ["Entrega do Projeto Alpha"],
  20: ["Planejamento Sprint 2"]
};

export default function Dashboard() {
  const [mesAtual, setMesAtual] = useState(11); // 11 = Dezembro
  const [anoAtual, setAnoAtual] = useState(2026);
  const [diaSelecionado, setDiaSelecionado] = useState(11);
  const [diaSemanaExpandido, setDiaSemanaExpandido] = useState(null);
  
  const dadosSemana = [
    { dia: 'Seg', valor: 3, tarefas: 3 },
    { dia: 'Ter', valor: 1, tarefas: 1 },
    { dia: 'Qua', valor: 2, tarefas: 2 },
    { dia: 'Qui', valor: 5, tarefas: 5 }, 
    { dia: 'Sex', valor: 2, tarefas: 2 },
    { dia: 'Sáb', valor: 1, tarefas: 1 },
    { dia: 'Dom', valor: 0, tarefas: 0 }, // Se for 0, a barra some
  ];

  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const avancarMes = () => {
    if (mesAtual === 11) { setMesAtual(0); setAnoAtual(anoAtual + 1); }
    else setMesAtual(mesAtual + 1);
  };
  const voltarMes = () => {
    if (mesAtual === 0) { setMesAtual(11); setAnoAtual(anoAtual - 1); }
    else setMesAtual(mesAtual - 1);
  };

  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay(); 

  // Encontra o maior valor (agora o maior é 5)
  const maxValor = Math.max(...dadosSemana.map(d => d.valor), 1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-red-600 px-8 py-6 flex justify-between items-center text-white shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Meus Projetos</h1>
          <p className="text-red-100 text-sm mt-1">Gerencie e acompanhe o progresso de suas equipes.</p>
        </div>
        <button className="bg-white text-red-600 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-red-50 transition-colors">
          + Criar Novo Projeto
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CardProjeto titulo="Projeto Alpha" progresso={75} descricao="Desenvolvimento da nova interface." />
          <CardProjeto titulo="Projeto Beta" progresso={30} descricao="Migração de banco de dados legado." />
          <CardProjeto titulo="Marketing Q4" progresso={90} descricao="Campanha de lançamento de final de ano." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* GRÁFICO CORRIGIDO E PROPORCIONAL */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Atividade Semanal</h2>
            
            <div className="flex h-64 items-end justify-between gap-4 px-2 border-b border-gray-100 pb-2">
              {dadosSemana.map((item, index) => {
                // Calcula a altura. Se o valor for maior (5), a barra é maior.
                const alturaPx = (item.valor / maxValor) * 220;

                return (
                  <div key={item.dia} className="flex flex-col items-center flex-1 group h-full justify-end">
                    <span className="text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                      {item.tarefas} {item.tarefas === 1 ? 'tarefa' : 'tarefas'}
                    </span>
                    
                    {/* Se a alturaPx for 0 (Dom), a barra fica invisível mas mantém o espaço */}
                    <div 
                      onClick={() => setDiaSemanaExpandido(diaSemanaExpandido === index ? null : index)}
                      className={`w-full max-w-[40px] rounded-t-md cursor-pointer transition-all duration-300 ${
                        diaSemanaExpandido === index ? 'bg-red-600' : 'bg-red-300 hover:bg-red-400'
                      }`}
                      style={{ height: `${alturaPx}px` }} 
                    ></div>
                    
                    <span className="text-xs text-gray-400 mt-2 font-medium">{item.dia}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 min-h-[70px]">
              {diaSemanaExpandido !== null ? (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 transition-all duration-300">
                  <h4 className="font-bold text-red-800 text-sm mb-1">Detalhes de {dadosSemana[diaSemanaExpandido].dia}</h4>
                  <p className="text-sm text-red-600">
                    {dadosSemana[diaSemanaExpandido].tarefas === 0 
                      ? "Nenhuma tarefa concluída." 
                      : `Você concluiu ${dadosSemana[diaSemanaExpandido].tarefas} tarefas neste dia.`}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic text-center mt-4">Clique em uma barra para ver os detalhes.</p>
              )}
            </div>
          </div>

          {/* CALENDÁRIO */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Distribuição de Tarefas</h2>
              
              <div className="flex items-center gap-3 text-gray-600">
                <button onClick={voltarMes} className="p-1 hover:bg-gray-100 rounded transition-colors font-bold">&lt;</button>
                <span className="text-sm font-bold min-w-[120px] text-center">
                  {meses[mesAtual]} {anoAtual}
                </span>
                <button onClick={avancarMes} className="p-1 hover:bg-gray-100 rounded transition-colors font-bold">&gt;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm">
              {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                <div key={d} className="text-gray-400 font-medium mb-2 text-xs">{d}</div>
              ))}
              
              {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9"></div>
              ))}

              {Array.from({ length: diasNoMes }, (_, i) => i + 1).map(dia => {
                const temTarefa = TAREFAS_SIMULADAS[dia];
                const isSelected = dia === diaSelecionado;

                return (
                  <div 
                    key={dia} 
                    onClick={() => setDiaSelecionado(dia)}
                    className={`relative flex justify-center items-center w-9 h-9 mx-auto rounded-full cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-red-500 text-white font-bold shadow-md shadow-red-200 scale-110' 
                        : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    {dia}
                    {temTarefa && !isSelected && (
                      <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 mt-6">
              <h4 className="font-bold text-gray-800 text-sm mb-3">Tarefas para dia {diaSelecionado}/{mesAtual + 1}</h4>
              {TAREFAS_SIMULADAS[diaSelecionado] ? (
                <ul className="space-y-2">
                  {TAREFAS_SIMULADAS[diaSelecionado].map((tarefa, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      {tarefa}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">Nenhuma tarefa registrada para este dia.</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}