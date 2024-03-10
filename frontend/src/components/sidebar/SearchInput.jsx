function SearchInput({ query, setQuery, error }) {
  return (
    <>
      <label className="input input-bordered input-primary flex items-center gap-2 mb-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="grow"
          placeholder="Search Users"
        />
      </label>
      {error && (
        <span className="text-red-500 text-xs text-center">{error}</span>
      )}
    </>
  );
}

export default SearchInput;
