import { useState } from "react";

export default function GraficoAtividadeSemanal({ dados }) {
  const [expandido, setExpandido] = useState(null);
  const maxValor = Math.max(...dados.map((d) => d.tarefas), 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Atividade Semanal</h2>

      <div className="flex h-64 items-end justify-between gap-4 px-2 border-b border-gray-100 pb-2">
        {dados.map((item, index) => (
          <div key={item.dia} className="flex flex-col items-center flex-1 group h-full justify-end">
            <span className="text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
              {item.tarefas} {item.tarefas === 1 ? "tarefa" : "tarefas"}
            </span>
            <div
              onClick={() => setExpandido(expandido === index ? null : index)}
              className={`w-full max-w-[40px] rounded-t-md cursor-pointer transition-all duration-300 ${
                expandido === index ? "bg-red-600" : "bg-red-300 hover:bg-red-400"
              }`}
              style={{ height: `${(item.tarefas / maxValor) * 220}px` }}
            />
            <span className="text-xs text-gray-400 mt-2 font-medium">{item.dia}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-[70px]">
        {expandido !== null ? (
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-800 text-sm mb-1">Detalhes de {dados[expandido].dia}</h4>
            <p className="text-sm text-red-600">
              {dados[expandido].tarefas === 0
                ? "Nenhuma tarefa concluída."
                : `Você concluiu ${dados[expandido].tarefas} tarefas neste dia.`}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic text-center mt-4">
            Clique em uma barra para ver os detalhes.
          </p>
        )}
      </div>
    </div>
  );
}