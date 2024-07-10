import { useState } from 'react';
import wordleList from '../mock/wordle-list.json';
import Notiflix from 'notiflix';

export enum LetterStatus {
  PRESENT = 'PRESENT',
  MISS = 'MISS',
  CORRECT = 'CORRECT',
}

export type FormattedLetter = {
  key: string;
  status: LetterStatus;
};

export function useWordle() {
  const [correctWord, setCorrectWord] = useState(getRandomWorld());
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<FormattedLetter[][]>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [usedKeys, setUsedKeys] = useState<Record<string, LetterStatus>>({});
  const [isCorrect, setIsCorrect] = useState(false);

  function getRandomWorld(): string {
    return wordleList[
      Math.floor(Math.random() * wordleList.length)
    ].toLowerCase();
  }

  function reset(): void {
    setCorrectWord(getRandomWorld());
    setCurrentTurn(0);
    setCurrentGuess('');
    setGuesses([...Array(6)]);
    setHistory([]);
    setUsedKeys({});
    setIsCorrect(false);
  }

  function formatGuess(): FormattedLetter[] {
    const solutionArray: (string | null)[] = [...correctWord];
    const formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      status: LetterStatus.MISS,
    }));

    formattedGuess.forEach((letter, index) => {
      if (correctWord[index] === letter.key) {
        formattedGuess[index].status = LetterStatus.CORRECT;
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (
        solutionArray.includes(letter.key) &&
        letter.status !== LetterStatus.CORRECT
      ) {
        formattedGuess[index].status = LetterStatus.PRESENT;
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  }

  function addNewGuess(formattedGuess: FormattedLetter[]): void {
    if (currentGuess === correctWord) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[currentTurn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setCurrentTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((letter) => {
        const currentStatus = prevUsedKeys[letter.key];

        if (letter.status === LetterStatus.CORRECT) {
          prevUsedKeys[letter.key] = LetterStatus.CORRECT;
          return;
        }

        if (
          letter.status === LetterStatus.PRESENT &&
          currentStatus !== LetterStatus.CORRECT
        ) {
          prevUsedKeys[letter.key] = LetterStatus.PRESENT;
          return;
        }

        if (
          letter.status === LetterStatus.MISS &&
          currentStatus !== (LetterStatus.CORRECT || LetterStatus.PRESENT)
        ) {
          prevUsedKeys[letter.key] = LetterStatus.MISS;
        }
      });
      return prevUsedKeys;
    });

    setCurrentGuess('');
  }

  function handleKeyUp({ key }: { key: string }): void {
    if (key === 'Enter') {
      if (currentTurn > 5) {
        Notiflix.Notify.info('You used all your guesses!');
        return;
      }

      if (history.includes(currentGuess)) {
        Notiflix.Notify.info('you already tried that word.');
        return;
      }

      if (currentGuess.length !== 5) {
        Notiflix.Notify.info('Word must be 5 chars');
        return;
      }

      const formattedLetter = formatGuess();
      addNewGuess(formattedLetter);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => (prev + key).toLowerCase());
      }
    }
  }

  return {
    currentTurn,
    currentGuess,
    guesses,
    usedKeys,
    handleKeyUp,
    isCorrect,
    reset,
    correctWord,
  };
}
