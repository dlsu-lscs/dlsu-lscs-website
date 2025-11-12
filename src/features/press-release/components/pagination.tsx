export default function Pagination() {
  return (
    <div className="flex justify-center py-6 gap-2">
      {[1, 2, 3].map((n) => (
        <button key={n} className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition" />
      ))}
    </div>
  );
}
