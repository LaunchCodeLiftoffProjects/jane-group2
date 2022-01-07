const SearchBar = () => (
  <form action="/" method="get">
    <label htmlFor="header-search">
      <span className="inside-boxes">Search items</span>
    </label>
    <input
      type="text"
      id="header-search"
      placeholder="What's In The Boxes?"
      name="s"
    />
    <button type="submit">Find!</button>
  </form>
);

export default SearchBar;
