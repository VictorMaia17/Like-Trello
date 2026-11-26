import { useState } from "react";

const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_SEMANA = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function CalendarioTarefas({ tarefasPorDia }) {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());

  const avancar = () => {
    if (mes === 11) { setMes(0); setAno(ano + 1); } else setMes(mes + 1);
  };
  const voltar = () => {
    if (mes === 0) { setMes(11); setAno(ano - 1); } else setMes(mes - 1);
  };

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const tarefasDoDia = tarefasPorDia[diaSelecionado];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Distribuição de Tarefas</h2>
        <div className="flex items-center gap-3 text-gray-600">
          <button onClick={voltar} className="p-1 hover:bg-gray-100 rounded font-bold">&lt;</button>
          <span className="text-sm font-bold min-w-[120px] text-center">{MESES[mes]} {ano}</span>
          <button onClick={avancar} className="p-1 hover:bg-gray-100 rounded font-bold">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="text-gray-400 font-medium mb-2 text-xs">{d}</div>
        ))}

        {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}

        {Array.from({ length: diasNoMes }, (_, i) => i + 1).map((dia) => {
          const selecionado = dia === diaSelecionado;
          return (
            <div
              key={dia}
              onClick={() => setDiaSelecionado(dia)}
              className={`relative flex justify-center items-center w-9 h-9 mx-auto rounded-full cursor-pointer transition-all ${
                selecionado
                  ? "bg-red-500 text-white font-bold shadow-md shadow-red-200 scale-110"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              {dia}
              {tarefasPorDia[dia] && !selecionado && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-400 rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-800 text-sm mb-3">
          Tarefas para dia {diaSelecionado}/{mes + 1}
        </h4>
        {tarefasDoDia ? (
          <ul className="space-y-2">
            {tarefasDoDia.map((tarefa, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                {tarefa}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">Nenhuma tarefa registrada para este dia.</p>
        )}
      </div>
    </div>
  );
}