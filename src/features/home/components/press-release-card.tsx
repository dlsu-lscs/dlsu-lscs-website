type PressReleaseCardProps = {
  type?: string;
  title?: string;
  content?: string;
  buttonText?: string;
};

export default function PressReleaseCard({
  type,
  title,
  content,
  buttonText,
}: PressReleaseCardProps) {
  return (
    <>
      <div
        className="flex flex-col 
  w-[clamp(198px,calc(198px+((100vw-1280px)*0.1546875)),297px)] 
  h-[clamp(420px,calc(420px+((100vw-1280px)*0.1666666)),620px)]"
      >
        <div className="bg-[#D9D9D9] w-full h-[clamp(220px,calc(220px+((100vw-1280px)*0.1333333)),340px)]"></div>
        <div className="flex flex-col flex-1">
          <div className="font-medium flex flex-col gap-1 mt-4">
            <h2 className="text-lg">{type || 'Community'}</h2>
            <h1 className="text-xl">{title || 'TITLE HERE'}</h1>
          </div>
          <p className="text-md w-full mt-6 flex-1">
            {content ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra, eros nec commodo semper, massa ipsum consequat risus, non efficitur tellus orci id nunc.'}
          </p>
          <div className="w-full py-3 text-lg bg-[#D9D9D9] mt-6 text-center font-medium">
            {buttonText || 'Lorem ipsum dolor'}
          </div>
        </div>
      </div>
    </>
  );
}
