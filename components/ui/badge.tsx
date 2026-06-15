import { cn } from "@/lib/utils";

/** Small pill used for tech tags and metadata. */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-white/20 hover:text-fg",
        className
      )}
    >
      {children}
    </span>
  );
}
