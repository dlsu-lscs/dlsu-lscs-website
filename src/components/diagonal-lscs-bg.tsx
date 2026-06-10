import { cn } from '@/lib/utils';

interface bgProps {
  className?: string;
}

export default function DiagonalLscsBg({ className }: bgProps) {
  return (
    <div
      className={cn('fixed inset-0 overflow-hidden -z-10 pointer-events-none', className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full
                   bg-[url('/40th-lscs-single.svg')] bg-repeat"
        style={{
          transform: 'rotate(-15deg)', // rotate background container
          transformOrigin: 'center',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
        }}
      />
    </div>
  );
}
