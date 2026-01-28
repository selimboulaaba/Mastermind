import { useState, useCallback } from "react";
import { Bounce, toast } from "react-toastify";

export type GameMode = "unique" | "duplicate";

export const COLORS = ["red", "green", "blue", "orange", "pink", "yellow"];

export const useMastermind = (mode: GameMode = "unique") => {
  const [targetCombination, setTargetCombination] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<(string | null)[][]>(
    Array(6).fill(null).map(() => Array(4).fill(null))
  );
  const [feedback, setFeedback] = useState<string[][]>(
    Array(6).fill(null).map(() => [])
  );
  const [currentTry, setCurrentTry] = useState(5); // Start from bottom (index 5)
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const startNewGame = useCallback(() => {
    let newCombination: string[] = [];
    if (mode === "unique") {
      const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
      newCombination = shuffled.slice(0, 4);
    } else {
      newCombination = Array.from({ length: 4 }, () =>
        COLORS[Math.floor(Math.random() * COLORS.length)]
      );
    }

    setTargetCombination(newCombination);
    setGuesses(Array(6).fill(null).map(() => Array(4).fill(null)));
    setFeedback(Array(6).fill(null).map(() => []));
    setCurrentTry(5);
    setIsGameOver(false);
  }, [mode]);

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  const placeColor = (row: number, col: number) => {
    if (isGameOver || row !== currentTry || !selectedColor) return;

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[row] = [...newGuesses[row]];
      newGuesses[row][col] = selectedColor;
      return newGuesses;
    });
  };

  const calculateFeedback = (guess: string[]) => {
    const whitePegs: string[] = []; // Correct color, correct position
    const blackPegs: string[] = []; // Correct color, wrong position

    const targetCopy = [...targetCombination];
    const guessCopy = [...guess];

    // First pass: Find white pegs
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === targetCopy[i]) {
        whitePegs.push("white");
        targetCopy[i] = "used";
        guessCopy[i] = "checked";
      }
    }

    // Second pass: Find black pegs
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] !== "checked") {
        const index = targetCopy.indexOf(guessCopy[i]);
        if (index !== -1) {
          blackPegs.push("black");
          targetCopy[index] = "used";
        }
      }
    }

    return [...whitePegs, ...blackPegs];
  };

  const submitGuess = useCallback(() => {
    const currentGuess = guesses[currentTry];
    if (currentGuess.some((c) => c === null)) {
      toast.warning("Complete the row first!", { theme: "dark" });
      return;
    }

    const result = calculateFeedback(currentGuess as string[]);
    setFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[currentTry] = result;
      return newFeedback;
    });

    if (result.filter((p) => p === "white").length === 4) {
      setIsGameOver(true);
      toast.success("Mastermind! You cracked the code!", {
        theme: "dark",
        transition: Bounce,
      });
    } else if (currentTry === 0) {
      setIsGameOver(true);
      toast.error("Game Over! Better luck next time.", {
        theme: "dark",
        transition: Bounce,
      });
    } else {
      setCurrentTry((prev) => prev - 1);
    }
  }, [currentTry, guesses, targetCombination]);

  return {
    targetCombination,
    guesses,
    feedback,
    currentTry,
    isGameOver,
    selectedColor,
    startNewGame,
    selectColor,
    placeColor,
    submitGuess,
  };
};
