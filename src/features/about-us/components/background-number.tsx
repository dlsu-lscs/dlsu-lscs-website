type BackgroundNumbers = {
  text: string;
  yOffset?: string;
  xOffset?: string;
};

export default function BackgroundNumber({
  text,
  yOffset = '0%',
  xOffset = '0%',
}: BackgroundNumbers) {
  return (
    <div
      className="relative inline-block select-none overflow-visible"
      style={{
        transform: `translate(${xOffset}, ${yOffset})`,
      }}
    >
      <h1
        className="absolute text-[200px] font-extrabold 
          bg-[linear-gradient(to_top,#002D57_0%,#1A5D89_35%,#DDB518_40%,#EDCC46_100%)] 
          bg-clip-text text-transparent"
        style={{
          WebkitTextStroke: '4px transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </h1>

      <h1 className="relative text-[200px] font-extrabold text-white">{text}</h1>
    </div>
  );
}
