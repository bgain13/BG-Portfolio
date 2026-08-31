export default function ServiceSystem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-panel text-text">
      <div className="deck-grid absolute inset-0 opacity-25" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <p className="deck-kicker">05 / Page architecture</p>
        <h1 className="mt-[2vh] max-w-[74vw] font-display text-[6.8vw] leading-[0.8] tracking-wide">One reusable service system</h1>
        <div className="mt-[6vh] grid flex-1 grid-cols-2 gap-[1.2vw]">
          <div className="deck-panel p-[2.2vw]"><p className="deck-number">01</p><p className="mt-[4vh] text-[1.5vw] leading-[1.45] text-text/80">Every Toolkit item opens its own service page</p></div>
          <div className="deck-panel p-[2.2vw]"><p className="deck-number">02</p><p className="mt-[4vh] text-[1.5vw] leading-[1.45] text-text/80">Each page has a focused hero, approach, capabilities, and selected work</p></div>
          <div className="deck-panel p-[2.2vw]"><p className="deck-number">03</p><p className="mt-[4vh] text-[1.5vw] leading-[1.45] text-text/80">Shared layouts keep the experience consistent</p></div>
          <div className="deck-panel p-[2.2vw]"><p className="deck-number">04</p><p className="mt-[4vh] text-[1.5vw] leading-[1.45] text-text/80">Each page ends with a direct contact path</p></div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Reusable by design</span><span className="deck-meta">05</span></div>
      </div>
    </div>
  );
}