import { LetterStatus } from '../hooks/useWordle';
import { line1, line2, line3 } from '../mock/keyboard.json';
import { cn } from '../utils/cn';

type KeyboardProps = {
  onClick: ({ key }: { key: string }) => void;
  usedKeys: Record<string, LetterStatus>;
};

export function Keyboard({ onClick, usedKeys }: KeyboardProps) {
  const statusColorMap = {
    [LetterStatus.CORRECT]: 'bg-wordle-green border-wordle-green',
    [LetterStatus.MISS]: 'bg-wordle-grey border-wordle-grey',
    [LetterStatus.PRESENT]: 'bg-wordle-yellow border-wordle-yellow',
  };

  function getKeyStatus(key: string) {
    const status = usedKeys[key.toLowerCase()];
    if (status) {
      return statusColorMap[status];
    }

    return '';
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center justify-center space-x-2">
        {line1.map(({ key }) => (
          <button
            className={cn(
              'rounded-md font-bold bg-gray-200 size-10 flex justify-center items-center',
              getKeyStatus(key),
            )}
            onClick={() => {
              onClick({ key });
            }}
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        {line2.map(({ key }) => (
          <button
            className={cn(
              'rounded-md font-bold bg-gray-200 size-10 flex justify-center items-center',
              getKeyStatus(key),
            )}
            onClick={() => {
              onClick({ key });
            }}
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        {line3.map(({ key }) => (
          <button
            className={cn(
              'rounded-md font-bold bg-gray-200 size-10 flex justify-center items-center',
              getKeyStatus(key),
              { 'w-20 h-10': key === ('Enter' || 'Backspace') },
            )}
            onClick={() => {
              onClick({ key });
            }}
            key={key}
          >
            {key === 'Backspace' ? (
              <>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                  data-testid="icon-backspace"
                >
                  <path
                    fill="var(--color-tone-1)"
                    d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                  />
                </svg>
              </>
            ) : (
              key
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
