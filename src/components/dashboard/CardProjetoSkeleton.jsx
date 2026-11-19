export default function CardProjetoSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse flex flex-col">
      <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-100 rounded mb-2" />
      <div className="h-3 w-4/5 bg-gray-100 rounded mb-6" />
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4" />
      <div className="h-9 w-full bg-gray-100 rounded-lg" />
    </div>
  );
}