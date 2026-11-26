import { useState } from "react";
import { useNavigate } from "react-router";

export default function ProjectForm({ title, submitLabel, initialValues, onSubmit }) {
    const navigate = useNavigate();

    const [name, setName] = useState(initialValues?.name ?? "");
    const [description, setDescription] = useState(initialValues?.description ?? "");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName || !trimmedDescription) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        onSubmit({ name: trimmedName, description: trimmedDescription });
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-red-600 px-8 py-6 text-white shadow-sm">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="mt-1 text-sm text-red-100">
                    Preencha os dados do projeto.
                </p>
            </header>

            <main className="mx-auto max-w-2xl p-6 sm:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError("");
                            }}
                            placeholder="Ex.: Projeto Alpha"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setError("");
                            }}
                            placeholder="Descreva brevemente os objetivos do projeto."
                            rows={5}
                            className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}