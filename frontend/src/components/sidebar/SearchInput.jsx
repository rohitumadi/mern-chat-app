function SearchInput() {
  return (
    <form>
      <label className="input input-bordered input-primary flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
    </form>
  );
}

export default SearchInput;
