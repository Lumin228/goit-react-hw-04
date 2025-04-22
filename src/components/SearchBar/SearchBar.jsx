import css from "../SearchBar/SearchBar.module.css";

function SearchBar({ onSearch }) {
  const handleSubmit = (evt, page) => {
    evt.preventDefault();
    const form = evt.target;
	const topic = form.elements.topic.value;
    if (topic === "") {
      return alert ('sorry type smth')
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          name="topic"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default SearchBar;
