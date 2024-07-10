import Notiflix from 'notiflix';

type ModalProps = {
  onClick: () => void;
  correctWord: string;
  turns: number;
};

export function useModal() {
  function showSuccessModal({ onClick, correctWord, turns }: ModalProps) {
    Notiflix.Report.success(
      `You Win! ${correctWord.toUpperCase()}`,
      `You found the solution in ${turns} guesses`,
      'Try Again',
      onClick,
    );
  }

  function showFailureModal({ onClick, correctWord }: ModalProps) {
    Notiflix.Report.failure(
      `You Lose! ${correctWord.toUpperCase()}`,
      `Better Luck next time`,
      'Try Again',
      onClick,
    );
  }

  return {
    showSuccessModal,
    showFailureModal,
  };
}
