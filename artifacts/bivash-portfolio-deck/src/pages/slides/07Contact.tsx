export default function Contact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-panel text-text">
      <div className="absolute right-[-10vw] top-[11vh] h-[61vh] w-[46vw] rounded-full border border-primary/30 rotate-[-17deg]" />
      <div className="absolute right-[-3vw] top-[23vh] h-[43vh] w-[38vw] rounded-full border border-accent/30 rotate-[17deg]" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-center justify-between"><p className="deck-kicker">07 / Open channel</p><p className="deck-meta">The contact path stays close</p></div>
        <div className="mt-[10vh] grid flex-1 grid-cols-[1fr_0.8fr] gap-[7vw]">
          <div><h1 className="max-w-[44vw] font-display text-[8.3vw] leading-[0.78] tracking-wide">The contact path stays close</h1><p className="mt-[5vh] max-w-[33vw] text-[1.5vw] leading-[1.45] text-text/70">Direct contact buttons are available from the portfolio and service pages</p></div>
          <div className="self-end pb-[3vh]">
            <div className="deck-contact-line"><p className="deck-meta">Email</p><p className="mt-[1vh] font-display text-[3.3vw] tracking-wide text-primary">bivashgain6@gmail.com</p></div>
            <div className="deck-contact-line"><p className="deck-meta">Phone</p><p className="mt-[1vh] font-display text-[3.3vw] tracking-wide text-text">+91 9547289013</p></div>
            <div className="deck-contact-line"><p className="deck-meta">Location</p><p className="mt-[1vh] font-display text-[3.3vw] tracking-wide text-text">India, West Bengal, Kolkata</p></div>
          </div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Bivaan Cine Edit</span><span className="deck-meta">07</span></div>
      </div>
    </div>
  );
}