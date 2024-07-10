import { useEffect } from 'react';
import { Grid } from './components/Grid';
import { Header } from './components/header';
import { useWordle } from './hooks/useWordle';
import { useModal } from './hooks/useModal';
import { Keyboard } from './components/Keyboard';

function App() {
  const {
    handleKeyUp,
    currentGuess,
    guesses,
    currentTurn,
    isCorrect,
    correctWord,
    reset,
    usedKeys,
  } = useWordle();
  const { showFailureModal, showSuccessModal } = useModal();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      showSuccessModal({ correctWord, onClick: reset, turns: currentTurn });
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (currentTurn > 5) {
      showFailureModal({ correctWord, onClick: reset, turns: currentTurn });
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    handleKeyUp,
    isCorrect,
    currentTurn,
    showSuccessModal,
    showFailureModal,
    correctWord,
    reset,
  ]);

  return (
    <>
      <main className="container py-8">
        <Header />
        <Grid
          currentGuess={currentGuess}
          guesses={guesses}
          currentTurn={currentTurn}
        />

        <Keyboard onClick={handleKeyUp} usedKeys={usedKeys} />
      </main>
    </>
  );
}

export default App;
