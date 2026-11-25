import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
// ⚠️ Caminho corrigido para a nova pasta (components/projects/view/)
import api from "../../services/api";
import { 
  DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, useDroppable
} from "@dnd-kit/core";
import { 
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ConteudoCard = ({ tarefa, isDragging }) => {
  return (
    <div className={`
      bg-white p-4 rounded-lg border transition-all duration-200
      ${isDragging ? 'shadow-2xl border-red-400 rotate-3 scale-105 cursor-grabbing' : 'shadow-sm border-gray-200 hover:border-gray-300 hover:shadow-md cursor-grab'}
      ${tarefa.status === 'Concluída' ? 'opacity-70' : ''}
    `}>
      <div className="mb-3">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${tarefa.tagColor || 'bg-gray-100 text-gray-700'}`}>
          {tarefa.tag || "GERAL"}
        </span>
      </div>
      <h4 className={`text-sm font-semibold text-gray-800 mb-3 ${tarefa.status === 'Concluída' ? 'line-through text-gray-500' : ''}`}>
        {tarefa.titulo}
      </h4>
      <div className="flex justify-between items-center text-xs">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] ${tarefa.respColor || 'bg-blue-600'}`}>
          {tarefa.responsavel || "US"}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {tarefa.data || "Sem data"}
          </span>
          <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${tarefa.prioColor || 'bg-gray-100 text-gray-700'}`}>
            {tarefa.prioridade || "MÉDIA"}
          </span>
        </div>
      </div>
    </div>
  );
};

function CardTarefa({ tarefa }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tarefa.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ConteudoCard tarefa={tarefa} isDragging={isDragging} />
    </div>
  );
}

function ColunaKanban({ coluna, tarefas, onAdicionarTarefa }) {
  const { setNodeRef, isOver } = useDroppable({ id: coluna });

  return (
    <div className="bg-gray-100/50 rounded-xl w-80 flex-shrink-0 flex flex-col max-h-full border border-gray-200">
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          {coluna}
          <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">{tarefas.length}</span>
        </h3>
      </div>

      <SortableContext items={tarefas.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div 
          ref={setNodeRef} 
          className={`p-3 flex-1 overflow-y-auto space-y-3 min-h-[150px] transition-colors duration-200 ${isOver ? 'bg-red-50/50' : ''}`}
        >
          {tarefas.map(tarefa => <CardTarefa key={tarefa.id} tarefa={tarefa} />)}
          
          <button 
            onClick={() => onAdicionarTarefa(coluna)}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all mt-2"
          >
            + Adicionar Tarefa
          </button>
        </div>
      </SortableContext>
    </div>
  );
}

export default function PaginaProjeto() {
  const { nome } = useParams(); 
  const navigate = useNavigate();
  
  const [abaAtiva, setAbaAtiva] = useState("quadro");
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [tarefaAtiva, setTarefaAtiva] = useState(null);
  const [nomeProjeto, setNomeProjeto] = useState("Carregando..."); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: "",
    tag: "DEV",
    prioridade: "MÉDIA",
    status: "A Fazer",
    data: ""
  });

  const colunas = ["A Fazer", "Em Andamento", "Concluída"];

  const formatarTarefa = (t) => ({
    id: t.id,
    titulo: t.title || t.titulo,
    status: t.status || "A Fazer",
    tag: t.tag || "DEV",
    prioridade: t.priority || t.prioridade || "MÉDIA",
    data: t.dueDate ? new Date(t.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : "Sem data",
    responsavel: "US",
    tagColor: "bg-blue-100 text-blue-700", 
    prioColor: (t.priority === "ALTA" || t.prioridade === "ALTA") ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700",
    respColor: "bg-blue-600"
  });

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        
        try {
          const projetoResponse = await api.get(`/projects/${nome}`);
          const nomeReal = projetoResponse.data.name || projetoResponse.data.nome || projetoResponse.data.title || "Projeto Sem Nome";
          setNomeProjeto(nomeReal);
        } catch (err) {
          console.error("Erro ao buscar dados do projeto:", err);
          setNomeProjeto("Projeto"); 
        }

        const tarefasResponse = await api.get(`/projects/${nome}/tasks`);
        setTarefas(tarefasResponse.data.map(formatarTarefa));
        
      } catch (error) {
        console.error("Erro geral ao carregar página:", error);
      } finally {
        setCarregando(false);
      }
    };

    if (nome) buscarDados();
  }, [nome]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const abrirModalNovaTarefa = (statusInicial = "A Fazer") => {
    setNovaTarefa({ ...novaTarefa, status: statusInicial, titulo: "" });
    setIsModalOpen(true);
  };

  const handleCriarTarefa = async (e) => {
    e.preventDefault();
    if (!novaTarefa.titulo.trim()) return;

    try {
      const payload = { 
        title: novaTarefa.titulo, 
        status: novaTarefa.status,
        tag: novaTarefa.tag,
        priority: novaTarefa.prioridade,
        dueDate: novaTarefa.data ? new Date(novaTarefa.data + "T12:00:00Z").toISOString() : null,
        projectId: nome 
      };
      
      const response = await api.post("/tasks", payload);
      setTarefas([...tarefas, formatarTarefa(response.data)]);
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.response?.data || error.message);
      const msgErro = error.response?.data?.message || "Verifique o console.";
      alert(`Erro ao criar tarefa: ${msgErro}`);
    }
  };

  const handleDeletarProjeto = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este projeto? Todas as tarefas serão apagadas permanentemente.");
    if (!confirmacao) return;

    try {
      await api.delete(`/projects/${nome}`);
      alert("Projeto excluído com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao deletar projeto:", error.response?.data || error.message);
      alert("Não foi possível excluir o projeto.");
    }
  };

  const handleDragStart = (event) => {
    setTarefaAtiva(tarefas.find(t => t.id === event.active.id));
  };

  const handleDragEnd = async (event) => {
    setTarefaAtiva(null);
    const { active, over } = event;
    if (!over) return;

    const tarefaId = active.id;
    const overId = over.id;
    const isOverAColuna = colunas.includes(overId);

    let novaTarefaObj = null;
    let novaColuna = "";

    setTarefas((tarefasAtuais) => {
      const tarefaAtivaIndex = tarefasAtuais.findIndex((t) => t.id === tarefaId);
      if (tarefaAtivaIndex === -1) return tarefasAtuais;

      if (isOverAColuna) {
        novaColuna = overId;
        const novasTarefas = [...tarefasAtuais];
        novasTarefas[tarefaAtivaIndex] = { ...novasTarefas[tarefaAtivaIndex], status: overId };
        novaTarefaObj = novasTarefas[tarefaAtivaIndex];
        return novasTarefas;
      }

      const tarefaOverIndex = tarefasAtuais.findIndex((t) => t.id === overId);
      novaColuna = tarefasAtuais[tarefaOverIndex].status;
      const novasTarefas = [...tarefasAtuais];
      novasTarefas[tarefaAtivaIndex] = { ...novasTarefas[tarefaAtivaIndex], status: novaColuna };
      novaTarefaObj = novasTarefas[tarefaAtivaIndex];

      return arrayMove(novasTarefas, tarefaAtivaIndex, tarefaOverIndex);
    });

    if (novaTarefaObj && novaColuna) {
      try {
        await api.patch(`/tasks/${tarefaId}`, { status: novaColuna });
      } catch (error) {
        console.error("Erro ao atualizar status no backend:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Criar Nova Tarefa</h2>
            <form onSubmit={handleCriarTarefa} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Tarefa</label>
                <input 
                  type="text" 
                  required
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({...novaTarefa, titulo: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Ex: Corrigir bug de login"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <select 
                    value={novaTarefa.tag}
                    onChange={(e) => setNovaTarefa({...novaTarefa, tag: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 outline-none bg-white"
                  >
                    <option value="DEV">DEV</option>
                    <option value="DESIGN">DESIGN</option>
                    <option value="MKT">MKT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                  <select 
                    value={novaTarefa.prioridade}
                    onChange={(e) => setNovaTarefa({...novaTarefa, prioridade: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 outline-none bg-white"
                  >
                    <option value="BAIXA">BAIXA</option>
                    <option value="MÉDIA">MÉDIA</option>
                    <option value="ALTA">ALTA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega</label>
                <input 
                  type="date" 
                  value={novaTarefa.data}
                  onChange={(e) => setNovaTarefa({...novaTarefa, data: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{nomeProjeto}</h1>
            <p className="text-xs text-gray-500">Visão Geral do Projeto</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDeletarProjeto}
            className="text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-red-200"
          >
            Excluir Projeto
          </button>

          <button 
            onClick={() => abrirModalNovaTarefa("A Fazer")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
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
        {carregando ? (
          <div className="text-gray-500 font-medium">Buscando informações do servidor...</div>
        ) : (
          <>
            {abaAtiva === "quadro" && (
              <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex gap-6 items-start h-full">
                  {colunas.map(coluna => {
                    const tarefasDaColuna = tarefas.filter(t => t.status === coluna);
                    return (
                      <ColunaKanban 
                        key={coluna} 
                        coluna={coluna} 
                        tarefas={tarefasDaColuna} 
                        onAdicionarTarefa={abrirModalNovaTarefa} 
                      />
                    );
                  })}

                  <button className="w-80 flex-shrink-0 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    <span className="text-2xl mb-1">+</span>
                    <span className="font-medium text-sm">Adicionar Coluna</span>
                  </button>
                </div>

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
          </>
        )}
      </main>
    </div>
  );
}