export function Header() {
  return (
    <header className="flex items-center justify-center gap-4">
      <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md border-4 border-black bg-black">
        <span className="size-3 bg-white" />
        <span className="size-3 bg-white" />
        <span className="size-3 bg-white" />
        <span className="size-3 bg-white" />
        <span className="size-3 bg-wordle-yellow" />
        <span className="size-3 bg-wordle-green" />
        <span className="size-3 bg-wordle-green" />
        <span className="size-3 bg-wordle-green" />
        <span className="size-3 bg-wordle-green" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Hello Wordle</h1>
        <h2 className="text-sm font-semibold uppercase">
          Developed by Bruno Dias.
        </h2>
      </div>
    </header>
  );
}
