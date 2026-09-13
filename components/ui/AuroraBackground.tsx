export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-primary">
      <div
        className="absolute left-[-10%] top-[-10%] h-[42rem] w-[42rem] rounded-full opacity-40 blur-[110px] animate-aurora-float-1"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[-15%] top-[10%] h-[38rem] w-[38rem] rounded-full opacity-30 blur-[110px] animate-aurora-float-2"
        style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-20%] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px] animate-aurora-float-3"
        style={{ background: "radial-gradient(circle, #818CF8 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-bg-primary/40" />
      <div className="noise-overlay" />
    </div>
  );
}
