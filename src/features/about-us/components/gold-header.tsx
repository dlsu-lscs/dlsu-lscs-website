type GoldHeaderProps = {
  children?: React.ReactNode;
};

export default function GoldHeader({ children }: GoldHeaderProps) {
  return (
    <>
      <div className="flex">
        <div className="bg-gradient-to-r from-[#FEE373] to-[#DDB518] py-2 px-4 rounded-lg drop-shadow-2xl shadow-xl">
          <h1 className="bg-gradient-to-r from-[#002D57] to-[#1A5D89] bg-clip-text text-transparent text-center font-bold text-4xl">
            {children}
          </h1>
        </div>
      </div>
    </>
  );
}
