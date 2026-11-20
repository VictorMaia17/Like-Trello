import ArchiveProject from "./ArchiveProject";

//Component for rendering the archiving confirmation
export default function ArchiveDialog({ project, onToggleArchive, onClose }) {
  if (!project) return null;

  return (
    <ArchiveProject
      project={project}
      onConfirm={() => {
        onToggleArchive(project.id);
        onClose();
      }}
      onCancel={onClose}
    />
  );
}