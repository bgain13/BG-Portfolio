export default function PortfolioPulse() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-bg text-text">
      <div className="deck-grid absolute inset-0 opacity-35" />
      <div className="deck-orbit left-[62vw] top-[-4vh]" />
      <div className="deck-orbit deck-orbit-coral left-[69vw] top-[13vh]" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-center justify-between">
          <p className="deck-kicker">02 / Visual language</p>
          <p className="deck-meta">A portfolio with a pulse</p>
        </div>
        <div className="mt-[9vh] grid flex-1 grid-cols-[0.9fr_1.1fr] gap-[7vw]">
          <div>
            <h1 className="max-w-[33vw] font-display text-[7.2vw] leading-[0.82] tracking-wide text-text">A portfolio with a pulse</h1>
            <div className="mt-[7vh] flex items-center gap-[1vw]"><span className="deck-line-accent" /><span className="deck-meta">Designed to feel like the work</span></div>
          </div>
          <div className="deck-panel flex flex-col justify-center p-[4vw]">
            <div className="flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">A dark, cinematic presentation for Bivaan Cine Edit</p></div>
            <div className="mt-[3vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Bold display type and high-contrast lime accents</p></div>
            <div className="mt-[3vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Motion, grain, grids, and orbit details create a film-inspired language</p></div>
            <div className="mt-[3vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Built to make the work feel as intentional as the work itself</p></div>
          </div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Bivash Gain</span><span className="deck-meta">02</span></div>
      </div>
    </div>
  );
}