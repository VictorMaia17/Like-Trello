import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  useDroppable
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- COMPONENTE VISUAL DO CARD (Para ser usado no DragOverlay e na Lista) ---
const ConteudoCard = ({ tarefa, isDragging }) => {
  return (
    <div className={`
      bg-white p-4 rounded-lg border transition-all duration-200
      ${isDragging 
        ? 'shadow-2xl border-red-400 rotate-3 scale-105 cursor-grabbing' 
        : 'shadow-sm border-gray-200 hover:border-gray-300 hover:shadow-md cursor-grab'
      }
      ${tarefa.status === 'Concluída' ? 'opacity-70' : ''}
    `}>
      <div className="mb-3">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${tarefa.tagColor}`}>
          {tarefa.tag}
        </span>
      </div>
      <h4 className={`text-sm font-semibold text-gray-800 mb-3 ${tarefa.status === 'Concluída' ? 'line-through text-gray-500' : ''}`}>
        {tarefa.titulo}
      </h4>
      <div className="flex justify-between items-center text-xs">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] ${tarefa.respColor}`}>
          {tarefa.responsavel}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {tarefa.data}
          </span>
          <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${tarefa.prioColor}`}>
            {tarefa.prioridade}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE SORTABLE (O Card que fica na lista) ---
function CardTarefa({ tarefa }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tarefa.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition, // Isso faz os cards deslizarem suavemente
    opacity: isDragging ? 0.3 : 1, // Deixa o original transparente enquanto arrasta o clone
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ConteudoCard tarefa={tarefa} isDragging={isDragging} />
    </div>
  );
}

// --- COMPONENTE DA COLUNA (Área de Drop) ---
function ColunaKanban({ coluna, tarefas }) {
  // useDroppable permite que a coluna inteira aceite o card
  const { setNodeRef, isOver } = useDroppable({ id: coluna });

  return (
    <div className="bg-gray-100/50 rounded-xl w-80 flex-shrink-0 flex flex-col max-h-full border border-gray-200">
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          {coluna}
          <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">{tarefas.length}</span>
        </h3>
        <button className="text-gray-400 hover:text-gray-600">...</button>
      </div>

      <SortableContext items={tarefas.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div 
          ref={setNodeRef} 
          className={`p-3 flex-1 overflow-y-auto space-y-3 min-h-[150px] transition-colors duration-200 ${
            isOver ? 'bg-red-50/50' : '' // Destaca a coluna quando o card está em cima
          }`}
        >
          {tarefas.map(tarefa => (
            <CardTarefa key={tarefa.id} tarefa={tarefa} />
          ))}
          
          <button className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all mt-2">
            + Adicionar Tarefa
          </button>
        </div>
      </SortableContext>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function PaginaProjeto() {
  const { nome } = useParams(); 
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("quadro");

  const [tarefas, setTarefas] = useState([
    { id: "1", titulo: "Redesign interface de login", tag: "DESIGN", tagColor: "bg-purple-100 text-purple-700", status: "A Fazer", data: "12 Mar", prioridade: "ALTA", prioColor: "bg-red-100 text-red-700", responsavel: "BG", respColor: "bg-purple-600" },
    { id: "2", titulo: "Refatoração manual do usuário", tag: "DEV", tagColor: "bg-blue-100 text-blue-700", status: "A Fazer", data: "20 Mar", prioridade: "MÉDIA", prioColor: "bg-yellow-100 text-yellow-700", responsavel: "KL", respColor: "bg-blue-600" },
    { id: "3", titulo: "Corrigir erro na exportação PDF", tag: "DEV", tagColor: "bg-blue-100 text-blue-700", status: "A Fazer", data: "05 Abr", prioridade: "BAIXA", prioColor: "bg-green-100 text-green-700", responsavel: "RJ", respColor: "bg-green-600" },
    { id: "4", titulo: "Implementar o Fluxo de Autenticação", tag: "DEV", tagColor: "bg-blue-100 text-blue-700", status: "Em Andamento", data: "14 Mar", prioridade: "ALTA", prioColor: "bg-red-100 text-red-700", responsavel: "AM", respColor: "bg-indigo-600" },
    { id: "5", titulo: "Campanha de lançamento Q3", tag: "MKT", tagColor: "bg-orange-100 text-orange-700", status: "Em Andamento", data: "30 Mar", prioridade: "MÉDIA", prioColor: "bg-yellow-100 text-yellow-700", responsavel: "FS", respColor: "bg-orange-600" },
    { id: "6", titulo: "Migração do servidor para nuvem", tag: "DEV", tagColor: "bg-blue-100 text-blue-700", status: "Concluída", data: "01 Mar", prioridade: "CONCLUÍDA", prioColor: "bg-green-100 text-green-700", responsavel: "PL", respColor: "bg-gray-600" },
  ]);

  // Guarda o card que está sendo arrastado para o DragOverlay
  const [tarefaAtiva, setTarefaAtiva] = useState(null);
  const colunas = ["A Fazer", "Em Andamento", "Concluída"];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setTarefaAtiva(tarefas.find(t => t.id === active.id));
  };

  const handleDragEnd = (event) => {
    setTarefaAtiva(null);
    const { active, over } = event;
    if (!over) return;

    const tarefaId = active.id;
    const overId = over.id;

    const isOverAColuna = colunas.includes(overId);

    setTarefas((tarefas) => {
      const tarefaAtivaIndex = tarefas.findIndex((t) => t.id === tarefaId);
      if (tarefaAtivaIndex === -1) return tarefas;

      if (isOverAColuna) {
        const novasTarefas = [...tarefas];
        novasTarefas[tarefaAtivaIndex] = { 
          ...novasTarefas[tarefaAtivaIndex], 
          status: overId 
        };
        return novasTarefas;
      }

      const tarefaOverIndex = tarefas.findIndex((t) => t.id === overId);
      const novaColuna = tarefas[tarefaOverIndex].status;

      const novasTarefas = [...tarefas];
      novasTarefas[tarefaAtivaIndex] = { 
        ...novasTarefas[tarefaAtivaIndex], 
        status: novaColuna 
      };

      return arrayMove(novasTarefas, tarefaAtivaIndex, tarefaOverIndex);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{nome}</h1>
            <p className="text-xs text-gray-500">Visão Geral do Projeto</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white">BG</div>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white">KL</div>
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white">FS</div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            + Nova Tarefa
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-8 pt-4 flex gap-6">
        {[
          { id: "quadro", label: "Quadro", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
          { id: "lista", label: "Lista", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
          { id: "cronograma", label: "Cronograma", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
        ].map(aba => (
          <button 
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              abaAtiva === aba.id ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={aba.icon}></path></svg>
            {aba.label}
          </button>
        ))}
      </div>

      <main className="flex-1 p-8 overflow-x-auto bg-gray-50">
        
        {abaAtiva === "quadro" && (
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCorners} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 items-start h-full">
              {colunas.map(coluna => {
                const tarefasDaColuna = tarefas.filter(t => t.status === coluna);
                return (
                  <ColunaKanban key={coluna} coluna={coluna} tarefas={tarefasDaColuna} />
                );
              })}

              <button className="w-80 flex-shrink-0 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-colors">
                <span className="text-2xl mb-1">+</span>
                <span className="font-medium text-sm">Adicionar Coluna</span>
              </button>
            </div>

            {/* O DragOverlay é o que cria a "sombra" flutuante bonita enquanto arrastamos */}
            <DragOverlay>
              {tarefaAtiva ? <ConteudoCard tarefa={tarefaAtiva} isDragging={true} /> : null}
            </DragOverlay>
          </DndContext>
        )}

        {abaAtiva === "lista" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Visão em Lista</h3>
            <p>Aqui seria exibida uma tabela com todas as tarefas.</p>
          </div>
        )}

        {abaAtiva === "cronograma" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Cronograma (Gantt)</h3>
            <p>Aqui seria exibido o gráfico de Gantt com os prazos.</p>
          </div>
        )}

      </main>
    </div>
  );
}