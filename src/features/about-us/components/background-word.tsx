type BackgroundWords = {
  text: string;
  yOffset?: string;
};

export default function BackgroundWord({ text, yOffset = '0%' }: BackgroundWords) {
  return (
    <div
      className="relative inline-block select-none overflow-visible"
      style={{
        transform: `translateY(${yOffset})`,
      }}
    >
      <h1
        className="absolute text-[160px] font-extrabold 
          bg-[linear-gradient(to_top,#002D57_0%,#1A5D89_35%,#DDB518_40%,#EDCC46_100%)] 
          bg-clip-text text-transparent"
        style={{
          WebkitTextStroke: '4px transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </h1>

      <h1 className="relative text-[160px] font-extrabold text-white">{text}</h1>
    </div>
  );
}
