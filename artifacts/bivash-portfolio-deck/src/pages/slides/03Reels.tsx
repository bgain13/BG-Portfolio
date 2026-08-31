export default function Reels() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-panel text-text">
      <div className="deck-grid absolute inset-0 opacity-25" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-start justify-between">
          <div><p className="deck-kicker">03 / Viewing rhythm</p><h1 className="mt-[2vh] font-display text-[6.7vw] leading-[0.8] tracking-wide">Built around how people watch</h1></div>
          <div className="mt-[1vh] h-[7vw] w-[7vw] rounded-full border border-primary/60" />
        </div>
        <div className="mt-[5vh] grid flex-1 grid-cols-[1fr_1.15fr] items-center gap-[5vw]">
          <div className="max-w-[36vw]">
            <div className="flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Reels appear near the top of the experience</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Portrait 9:16 cards create a mobile-first viewing rhythm</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Horizontal scrolling works with touch, wheel, and drag</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">YouTube Shorts, local MP4 video, and portrait images are supported</p></div>
          </div>
          <div className="flex items-end justify-center gap-[2.2vw]">
            <div className="deck-phone rotate-[-7deg]"><div className="deck-phone-screen"><div className="absolute bottom-[2vw] left-[1vw] font-display text-[2.6vw] tracking-wide text-text">REELS</div></div></div>
            <div className="deck-phone translate-y-[-3vh] rotate-[4deg]"><div className="deck-phone-screen bg-[linear-gradient(145deg,#4c5a3a,#111715_52%,#78463e)]"><div className="absolute bottom-[2vw] left-[1vw] font-display text-[2.6vw] tracking-wide text-primary">9:16</div></div></div>
            <div className="deck-phone rotate-[11deg]"><div className="deck-phone-screen bg-[linear-gradient(145deg,#364b44,#121817_55%,#4e3430)]"><div className="absolute bottom-[2vw] left-[1vw] font-display text-[2.6vw] tracking-wide text-accent">CUTS</div></div></div>
          </div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Portrait first</span><span className="deck-meta">03</span></div>
      </div>
    </div>
  );
}