import { FormattedLetter } from '../hooks/useWordle';
import { Row } from './Row';

type GridProps = {
  currentGuess: string;
  guesses: FormattedLetter[][];
  currentTurn: number;
};

export function Grid({ currentGuess, guesses, currentTurn }: GridProps) {
  return (
    <>
      <div className="mx-auto mt-8 flex max-w-xs flex-col space-y-5 pt-8">
        {guesses &&
          guesses.map((guess, index) => {
            if (currentTurn === index) {
              return <Row key={index} currentGuess={currentGuess} />;
            }

            return <Row key={index} guess={guess} />;
          })}
      </div>
    </>
  );
}
