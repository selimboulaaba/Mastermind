import { NavLink } from "react-router-dom";
import logo from "../assets/Untitled.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-2 sm:px-6 sm:py-3">
      <nav className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 sm:p-1.5 bg-amber-900/50 rounded-lg sm:rounded-xl border border-amber-500/30 shadow-lg shadow-amber-900/20 shrink-0">
            <img src={logo} className="w-6 h-6 sm:w-8 rounded-lg sm:h-8 object-contain" alt="Mastermind Logo" />
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent uppercase whitespace-nowrap">
            Mastermind
          </h1>
        </div>

        <div className="flex gap-1 bg-black/30 p-1 rounded-xl sm:rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
          <NavLink
            to="/unique"
            className={({ isActive }) =>
              `px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all duration-300 whitespace-nowrap
              ${isActive
                ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40"
                : "text-white/60 hover:text-white hover:bg-white/5"}`
            }
          >
            Unique
          </NavLink>

          <NavLink
            to="/duplicate"
            className={({ isActive }) =>
              `px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all duration-300 whitespace-nowrap
              ${isActive
                ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40"
                : "text-white/60 hover:text-white hover:bg-white/5"}`
            }
          >
            Duplicate
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
