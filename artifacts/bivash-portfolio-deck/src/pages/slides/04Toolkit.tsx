export default function Toolkit() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-bg text-text">
      <div className="absolute right-[-8vw] top-[9vh] h-[52vh] w-[42vw] rounded-full border border-primary/25 rotate-[-18deg]" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-end justify-between"><div><p className="deck-kicker">04 / The toolkit</p><h1 className="mt-[2vh] font-display text-[7.4vw] leading-[0.8] tracking-wide">The toolkit becomes a destination</h1></div><p className="deck-meta pb-[1vh]">Eight focused pages</p></div>
        <div className="mt-[6vh] grid flex-1 grid-cols-2 gap-x-[7vw] gap-y-[1vh]">
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">01</span><span className="font-display text-[3.1vw] tracking-wide">Video Editing</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">02</span><span className="font-display text-[3.1vw] tracking-wide">Videography</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">03</span><span className="font-display text-[3.1vw] tracking-wide">Motion Graphics</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">04</span><span className="font-display text-[3.1vw] tracking-wide">Color Grading</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">05</span><span className="font-display text-[3.1vw] tracking-wide">Sound Design</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">06</span><span className="font-display text-[3.1vw] tracking-wide">Post-Production</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">07</span><span className="font-display text-[3.1vw] tracking-wide">Graphics Creation</span></div>
          <div className="deck-service-item flex items-center gap-[1.4vw]"><span className="deck-number">08</span><span className="font-display text-[3.1vw] tracking-wide">YouTube &amp; Social Content</span></div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Every label leads somewhere</span><span className="deck-meta">04</span></div>
      </div>
    </div>
  );
}