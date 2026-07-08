interface SectionEyebrowProps {
  command: string;
  label: string;
}

export default function SectionEyebrow({
  command,
  label,
}: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs tracking-wider uppercase text-muted">
        <span className="text-teal">&gt; </span>
        {command}
      </span>
      {label && (
        <>
          <span className="h-px flex-1 bg-muted/20" />
          <span className="font-mono text-xs text-muted/60">{label}</span>
        </>
      )}
    </div>
  );
}
