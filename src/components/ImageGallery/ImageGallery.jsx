import { ImagesCard } from "./ImageCard";
import css from '../ImageGallery/ImageGallery.module.css'

export const ImageGallery = ({ result }) => {
    if (!Array.isArray(result)) {
      return <p>No images found.</p>;
    }
  
    return (
      <ul className={css.list}>
        {result.map((item) => (
          <li key={item.id}>
            <ImagesCard data={item} />
          </li>
        ))}
      </ul>
    );
  };
  