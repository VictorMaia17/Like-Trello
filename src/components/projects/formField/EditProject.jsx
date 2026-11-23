import { useNavigate, useParams, Navigate } from "react-router";
import ProjectForm from "../formField/ProjectForm";

export default function EditProject({ projects, onSave }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => String(p.id) === id);

    if (!project || project.archived) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <ProjectForm
            title="Editar Projeto"
            submitLabel="Salvar Alterações"
            initialValues={project}
            onSubmit={(data) => {
                onSave({ ...project, ...data });
                navigate("/dashboard");
            }}
        />
    );
}