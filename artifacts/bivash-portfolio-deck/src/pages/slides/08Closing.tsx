export default function Closing() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-bg text-text">
      <div className="deck-grid absolute inset-0 opacity-35" />
      <div className="absolute left-[-8vw] bottom-[-21vh] h-[56vh] w-[60vw] rounded-[50%] border border-primary/30 rotate-[-18deg]" />
      <div className="relative z-10 flex h-full flex-col justify-between px-[7vw] py-[7vh]">
        <div className="flex items-center justify-between"><p className="deck-kicker">08 / Next frame</p><p className="deck-meta">A portfolio designed to grow</p></div>
        <div className="max-w-[72vw]"><h1 className="font-display text-[11vw] leading-[0.78] tracking-wide">A portfolio designed to grow</h1><div className="mt-[5vh] grid max-w-[60vw] grid-cols-2 gap-x-[4vw] gap-y-[2vh]"><p className="text-[1.5vw] leading-[1.4] text-text/75">— Add the next reel when the next story is ready</p><p className="text-[1.5vw] leading-[1.4] text-text/75">— Add service-specific examples as the archive expands</p><p className="text-[1.5vw] leading-[1.4] text-text/75">— Keep the visual system consistent while the work gets bigger</p><p className="text-[1.5vw] leading-[1.4] text-text/75">— Bivaan Cine Edit / Bivash Gain</p></div></div>
        <div><div className="deck-rule" /><div className="flex items-end justify-between pt-[2vh]"><span className="font-display text-[3vw] tracking-wide text-primary">Bivaan Cine Edit / Bivash Gain</span><span className="deck-meta">08 / End frame</span></div></div>
      </div>
    </div>
  );
}