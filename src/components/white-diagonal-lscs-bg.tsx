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
        className="absolute inset-0 w-full h-full bg-repeat opacity-15"
        style={{
          backgroundImage: "url('/40th-lscs-single.svg')",
          transform: 'rotate(-10deg)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
