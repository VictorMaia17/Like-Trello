export default function Spinner({
  tamanho = "h-5 w-5",
  cor = "border-gray-300 border-t-red-500",
}) {
  return (
    <div
      className={`${tamanho} animate-spin rounded-full border-2 ${cor}`}
      role="status"
      aria-label="Carregando"
    />
  );
}