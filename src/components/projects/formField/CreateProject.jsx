import { useNavigate } from "react-router";
import ProjectForm from "../formField/ProjectForm";

export default function CreateProject({ onSave }) {
    const navigate = useNavigate();

    return (
        <ProjectForm
            title="Novo Projeto"
            submitLabel="Salvar Projeto"
            onSubmit={(data) => {
                onSave({ id: Date.now(), ...data });
                navigate("/dashboard");
            }}
        />
    );
}