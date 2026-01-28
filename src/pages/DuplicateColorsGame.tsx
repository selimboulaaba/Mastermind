import { useEffect } from "react";
import { useMastermind } from "../hooks/useMastermind";
import MastermindBoard from "../components/MastermindBoard";

const DuplicateColorsGame = () => {
  const {
    guesses,
    feedback,
    currentTry,
    isGameOver,
    selectedColor,
    targetCombination,
    startNewGame,
    selectColor,
    placeColor,
    submitGuess,
  } = useMastermind("duplicate");

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  return (
    <MastermindBoard
      modeTitle="Duplicate Colors"
      guesses={guesses}
      feedback={feedback}
      currentTry={currentTry}
      isGameOver={isGameOver}
      selectedColor={selectedColor}
      targetCombination={targetCombination}
      onPlaceColor={placeColor}
      onSelectColor={selectColor}
      onSubmitGuess={submitGuess}
      onStartNewGame={startNewGame}
    />
  );
};

export default DuplicateColorsGame;
