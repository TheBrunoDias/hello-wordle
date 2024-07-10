import { FormattedLetter, LetterStatus } from '../hooks/useWordle';
import { cn } from '../utils/cn';

type RowProps = {
  currentGuess?: string;
  guess?: FormattedLetter[];
};

export function Row({ currentGuess, guess }: RowProps) {
  const letterClassName = cn(
    'flex aspect-square uppercase w-full items-center justify-center border bg-transparent text-2xl border-gray-400 font-black',
  );

  const statusColorMap = {
    [LetterStatus.CORRECT]: 'bg-wordle-green border-wordle-green',
    [LetterStatus.MISS]: 'bg-wordle-grey border-wordle-grey',
    [LetterStatus.PRESENT]: 'bg-wordle-yellow border-wordle-yellow',
  };

  if (guess) {
    return (
      <div className="grid grid-cols-5 gap-1">
        {guess.map((letter, index) => (
          <div
            key={index}
            className={cn(letterClassName, statusColorMap[letter.status])}
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className="grid grid-cols-5 gap-1">
        {letters.map((letter, index) => (
          <div
            className={cn(
              letterClassName,
              'animate-letterEnter border-gray-700',
            )}
            key={index}
          >
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div className={letterClassName} key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      <div className={letterClassName} />
      <div className={letterClassName} />
      <div className={letterClassName} />
      <div className={letterClassName} />
      <div className={letterClassName} />
    </div>
  );
}
