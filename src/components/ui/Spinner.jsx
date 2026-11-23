export default function Spinner({ tamanho = "h-5 w-5" }) {
  return (
    <div
      className={`${tamanho} animate-spin rounded-full border-2 border-gray-300 border-t-red-500`}
      role="status"
      aria-label="Carregando"
    />
  );
}