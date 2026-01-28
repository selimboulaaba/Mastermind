import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

function Helper() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 mt-8 sm:px-6 sm:pb-20 sm:mt-12">
      <div
        className="glass rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:ring-2 ring-amber-500/30"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <button className="flex items-center justify-between p-4 sm:p-8 w-full">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors duration-500 ${accordionOpen ? 'bg-amber-600' : 'bg-white/5 group-hover:bg-white/10'}`}>
              <SlArrowDown
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${accordionOpen ? "rotate-180 text-white" : "text-amber-500"}`}
              />
            </div>
            <span className="text-sm sm:text-lg font-black uppercase tracking-widest text-white/90">How to Play</span>
          </div>
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
            {accordionOpen ? 'Close' : 'Open'}
          </div>
        </button>

        <div
          className={`grid transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <div className="p-4 pt-0 sm:p-8 sm:pt-0 space-y-4 sm:space-y-8 text-white/70 text-xs sm:text-sm leading-relaxed border-t border-white/5 mt-2">
              <section className="space-y-2">
                <h3 className="text-amber-500 font-black uppercase tracking-widest text-[10px] sm:text-sm">The Objective</h3>
                <p>Crack the secret code consisting of 4 colored pegs. You have 6 attempts to solve the mystery.</p>
              </section>

              <section className="grid sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-3">
                  <h3 className="text-amber-500 font-black uppercase tracking-widest text-[10px] sm:text-sm">Gameplay</h3>
                  <ol className="space-y-2 sm:space-y-4 list-decimal list-inside marker:text-amber-500 marker:font-bold">
                    <li>Select a color from the palette.</li>
                    <li>Click a slot in the current row.</li>
                    <li>Fill 4 slots and hit <span className="text-white font-bold px-1.5 py-0.5 bg-amber-600 rounded">GUESS</span>.</li>
                  </ol>
                </div>

                <div className="space-y-3 bg-black/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5">
                  <h3 className="text-amber-500 font-black uppercase tracking-widest text-[10px] sm:text-sm">Feedback Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-[0_0_8px_white]" />
                      <div>
                        <p className="font-bold text-white text-[10px] sm:text-sm">White Peg</p>
                        <p className="text-[9px] sm:text-xs">Correct color, correct position.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-900 border border-white/20" />
                      <div>
                        <p className="font-bold text-white text-[10px] sm:text-sm">Black Peg</p>
                        <p className="text-[9px] sm:text-xs">Correct color, wrong position.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4">
                <div className="text-2xl text-amber-500 shrink-0">💡</div>
                <p className="text-[10px] sm:text-xs italic">
                  Tip: In <span className="text-amber-500 font-bold">Duplicate</span> mode, the secret code can contain multiple pegs of the same color!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Helper;
