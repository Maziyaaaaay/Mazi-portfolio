export default function ToolBadge({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-line bg-elevated px-3 py-1 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-gold-dim">
      {children}
    </span>
  );
}
