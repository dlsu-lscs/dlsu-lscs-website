export default function NavbarButton({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: string;
}) {
  return (
    <>
      <div className="bg-[#007EBB] text-[#FFFF] font-onest font-medium rounded-lg px-10 py-2 hover:bg-[#005f87] transition-colors">
        <a href={link || ''}>{children}</a>
      </div>
    </>
  );
}
