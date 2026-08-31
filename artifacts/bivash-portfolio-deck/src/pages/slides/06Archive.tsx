export default function Archive() {
  return (
    <div className="w-screen h-screen overflow-hidden relative deck-grain bg-bg text-text">
      <div className="deck-orbit left-[-14vw] top-[44vh]" />
      <div className="deck-orbit deck-orbit-coral left-[-8vw] top-[54vh]" />
      <div className="relative z-10 flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-end justify-between"><div><p className="deck-kicker">06 / Media model</p><h1 className="mt-[2vh] font-display text-[6.8vw] leading-[0.8] tracking-wide">Ready for the growing archive</h1></div><p className="deck-meta pb-[1vh]">Add the next frame</p></div>
        <div className="mt-[6vh] grid flex-1 grid-cols-[1.2fr_0.8fr] gap-[5vw]">
          <div className="grid grid-cols-2 gap-[1.2vw]">
            <div className="deck-file-card flex flex-col justify-between p-[2vw]"><span className="deck-kicker">01 / Embed</span><span className="font-display text-[3.8vw] tracking-wide">YouTube</span><span className="deck-meta">Connect any service page</span></div>
            <div className="deck-file-card flex flex-col justify-between p-[2vw]"><span className="deck-kicker">02 / Local</span><span className="font-display text-[3.8vw] tracking-wide">MP4</span><span className="deck-meta">Project media, ready to play</span></div>
            <div className="deck-file-card flex flex-col justify-between p-[2vw]"><span className="deck-kicker">03 / Still</span><span className="font-display text-[3.8vw] tracking-wide">Image</span><span className="deck-meta">Images and thumbnails</span></div>
            <div className="deck-file-card flex flex-col justify-between p-[2vw]"><span className="deck-kicker">04 / Link</span><span className="font-display text-[3.8vw] tracking-wide">Drive</span><span className="deck-meta">External project archive</span></div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">YouTube embeds can be connected to any service page</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Local MP4 videos can be added as project media</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Images and thumbnails are supported for future examples</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">Google Drive and external project links remain available</p></div>
            <div className="mt-[2.7vh] flex items-start gap-[1.2vw]"><span className="deck-bullet mt-[0.5vh]">—</span><p className="text-[1.5vw] leading-[1.45] text-text/80">New projects can be attached to multiple service pages</p></div>
          </div>
        </div>
        <div className="deck-rule" />
        <div className="flex justify-between pt-[2vh]"><span className="deck-meta">Future-ready media</span><span className="deck-meta">06</span></div>
      </div>
    </div>
  );
}