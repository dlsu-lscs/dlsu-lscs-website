export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
