export default function HorizontalLscsBg() {
  return (
    <div
      className="absolute inset-0 bg-[url('/40th-lscs-single.svg')] bg-repeat bg-center"
      style={{
        maskImage:
          'linear-gradient(to right, rgb(0,0,0,0.2) 0%, rgb(0,0,0,0.8) 10%, rgb(0,0,0,0.8) 90%, rgb(0,0,0,0.2) 100%),' +
          'linear-gradient(to bottom, rgb(0,0,0,0.1) 0%, rgb(0,0,0,0.8) 10%, rgb(0,0,0,0.8) 90%, rgb(0,0,0,0.1) 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, rgb(0,0,0,0.2) 0%, rgb(0,0,0,0.8) 10%, rgb(0,0,0,0.8) 90%, rgb(0,0,0,0.2) 100%),' +
          'linear-gradient(to bottom, rgb(0,0,0,0.1) 0%, rgb(0,0,0,0.8) 10%, rgb(0,0,0,0.8) 90%, rgb(0,0,0,0.1) 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'destination-in',
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
}
