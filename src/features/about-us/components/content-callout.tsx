type Props = {
  children?: React.ReactNode;
};

export default function ContentCallout({ children }: Props) {
  return (
    <>
      <div className="border-l-4 border-black px-4 w-[40%] mt-6">
        <p className="w-full break-after-right">{children}</p>
      </div>
    </>
  );
}
