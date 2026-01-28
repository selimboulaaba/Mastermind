import React from "react";
import { COLORS } from "../hooks/useMastermind";

interface MastermindBoardProps {
    guesses: (string | null)[][];
    feedback: string[][];
    currentTry: number;
    isGameOver: boolean;
    selectedColor: string | null;
    targetCombination: string[];
    onPlaceColor: (row: number, col: number) => void;
    onSelectColor: (color: string) => void;
    onSubmitGuess: () => void;
    onStartNewGame: () => void;
    modeTitle: string;
}

const MastermindBoard: React.FC<MastermindBoardProps> = ({
    guesses,
    feedback,
    currentTry,
    isGameOver,
    selectedColor,
    targetCombination,
    onPlaceColor,
    onSelectColor,
    onSubmitGuess,
    onStartNewGame,
    modeTitle,
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-white">
            <div className="w-full max-w-[340px] sm:max-w-md p-4 sm:p-6 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <h2 className="text-xl sm:text-2xl font-black text-center mb-4 sm:mb-6 tracking-tighter bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent uppercase">
                    {modeTitle}
                </h2>

                {/* Target Combination (Hidden until game over) */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 bg-black/20 rounded-xl border border-white/5">
                    {targetCombination.map((color, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 transition-all duration-500 flex items-center justify-center text-sm sm:text-lg font-bold
                ${isGameOver ? "" : "bg-gray-800/80 shadow-inner"}`}
                            style={isGameOver ? {
                                backgroundColor: color,
                                boxShadow: `0 0 10px ${color}80, inset 0 2px 4px rgba(255,255,255,0.4)`
                            } : {}}
                        >
                            {!isGameOver && "?"}
                        </div>
                    ))}
                </div>

                {/* Game Board */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {guesses.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`flex items-center pl-10 gap-2 sm:gap-4 transition-all duration-300 p-1 rounded-xl
                ${rowIndex === currentTry && !isGameOver ? "bg-white/5 ring-1 ring-white/10" : ""}`}
                        >
                            {/* Guess Pins */}
                            <div className="flex gap-1.5 sm:gap-2">
                                {row.map((color, colIndex) => (
                                    <button
                                        key={colIndex}
                                        disabled={rowIndex !== currentTry || isGameOver}
                                        onClick={() => onPlaceColor(rowIndex, colIndex)}
                                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-white/10 transition-all cursor-pointer shadow-lg
                      ${rowIndex === currentTry && !isGameOver ? "hover:scale-110 active:scale-95 border-white/30" : "opacity-80"}
                      ${!color ? "bg-black/20" : ""}`}
                                        style={color ? {
                                            backgroundColor: color,
                                            boxShadow: `0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)`
                                        } : {}}
                                    />
                                ))}
                            </div>

                            {/* Feedback Pins */}
                            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-black/40 rounded-lg">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/5 shadow-inner
                      ${feedback[rowIndex][i] === "white" ? "bg-white shadow-[0_0_3px_white]" :
                                                feedback[rowIndex][i] === "black" ? "bg-gray-900 border-white/10" : "bg-transparent"}`}
                                    />
                                ))}
                            </div>

                            {/* Submit Button for Active Row */}
                            {rowIndex === currentTry && !isGameOver && (
                                <button
                                    onClick={onSubmitGuess}
                                    className="ml-auto px-2 sm:px-4 py-1.5 sm:py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-[10px] sm:text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95"
                                >
                                    Guess
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Color Palette */}
                <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Select Color</p>
                    <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                onClick={() => onSelectColor(color)}
                                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full transition-all duration-300 shadow-xl
                  ${selectedColor === color ? "ring-2 sm:ring-4 ring-white ring-offset-2 ring-offset-black/20 scale-110 sm:scale-125 z-10" : "hover:scale-110"}`}
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 4px 8px ${color}40, inset 0 1px 2px rgba(255,255,255,0.4)`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-6 sm:mt-10">
                    <button
                        onClick={onStartNewGame}
                        className="w-full py-3 sm:py-4 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black rounded-xl sm:rounded-2xl text-sm sm:text-lg tracking-wider transition-all shadow-xl active:scale-[0.98] border-t border-white/20"
                    >
                        {targetCombination.length > 0 ? "Reset Game" : "Start Game"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MastermindBoard;
