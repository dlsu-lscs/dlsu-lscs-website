import { cn } from '@/lib/utils';

interface WhiteDiagonalLscsBgProps {
  className?: string;
}

export default function WhiteDiagonalLscsBg({ className }: WhiteDiagonalLscsBgProps) {
  return (
    <div
      className={cn('fixed inset-0 overflow-hidden z-0 pointer-events-none', className)}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-repeat opacity-10"
        style={{
          backgroundImage: "url('/40th-lscs-single.svg')",
          filter: 'brightness(0) invert(1)',
          WebkitFilter: 'brightness(0) invert(1)',
          transform: 'translate(-50%, -50%) rotate(-10deg)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
