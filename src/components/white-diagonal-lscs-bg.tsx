export default function WhiteDiagonalLscsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-0" aria-hidden="true">
      <div
        className="absolute top-1/2 left-1/2 w-[175%] h-[175%] -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          WebkitMaskImage: "url('/40th-lscs-single.svg')",
          maskImage: "url('/40th-lscs-single.svg')",
          WebkitMaskRepeat: 'repeat',
          maskRepeat: 'repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'auto',
          maskSize: 'auto',
          transform: 'rotate(-10deg)',
          transformOrigin: 'center',
          opacity: 0.9,
        }}
      />
    </div>
  );
}
