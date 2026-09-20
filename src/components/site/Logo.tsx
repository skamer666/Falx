export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="text-lg font-semibold tracking-tight text-text">
        Thrax
      </span>
      <span className="text-lg font-normal tracking-tight text-text-muted">
        Legal
      </span>
    </span>
  );
}
