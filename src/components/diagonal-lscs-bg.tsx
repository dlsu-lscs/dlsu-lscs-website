export default function DiagonalLscsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      <div
        className="absolute top-1/2 left-1/2 w-[175%] h-[175%] -translate-x-1/2 -translate-y-1/2
                   bg-[url('/40th-lscs-single.svg')] bg-repeat bg-center"
        style={{
          transform: 'rotate(-30deg)', // rotate background container
          transformOrigin: 'center',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}
