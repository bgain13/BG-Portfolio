const base = import.meta.env.BASE_URL;

export default function BivashGain() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-bg text-text">
      <img src={base + 'hero-reel.jpg'} crossOrigin="anonymous" alt="Cinematic video editing workspace" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,20,19,0.98)_0%,rgba(16,20,19,0.78)_47%,rgba(16,20,19,0.3)_100%)]" />
      <div className="deck-grid absolute inset-0 opacity-30" />
      <div className="absolute right-[8vw] top-[17vh] h-[38vh] w-[29vw] rounded-[50%] border border-primary/40 rotate-[-18deg]" />
      <div className="absolute right-[4vw] top-[27vh] h-[28vh] w-[30vw] rounded-[50%] border border-accent/35 rotate-[16deg]" />
      <div className="relative z-10 flex h-full flex-col justify-between px-[7vw] py-[7vh]">
        <div className="flex items-center gap-[1vw]">
          <span className="flex h-[3.2vw] w-[3.2vw] items-center justify-center bg-primary font-display text-[2vw] text-bg">BG.</span>
          <span className="deck-meta">Portfolio showcase</span>
        </div>
        <div className="max-w-[74vw]">
          <p className="deck-kicker flex items-center gap-[1vw]"><span className="deck-line-accent" /> Bivaan Cine Edit</p>
          <h1 className="mt-[3vh] font-display text-[12vw] leading-[0.78] tracking-wide text-text">Bivash Gain</h1>
          <p className="mt-[4vh] max-w-[42vw] text-[1.7vw] leading-[1.45] text-text/75">A cinematic portfolio for video editing, videography, and motion design</p>
        </div>
        <div className="flex items-end justify-between border-t border-text/20 pt-[2vh]">
          <span className="deck-meta">01 / Portfolio system</span>
          <span className="deck-meta">Cinematic editorial direction</span>
        </div>
      </div>
    </div>
  );
}