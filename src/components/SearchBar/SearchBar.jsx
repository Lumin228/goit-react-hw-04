import css from "../SearchBar/SearchBar.module.css";
import toast, { Toaster } from 'react-hot-toast';



function SearchBar({ onSearch }) {
  const handleSubmit = (evt, page) => {
    evt.preventDefault();
    const form = evt.target;
	const topic = form.elements.topic.value;
    if (topic === "") {
      return toast.error("This didn't work.")
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
      <Toaster />
    </header>
  );
}

export default SearchBar;
