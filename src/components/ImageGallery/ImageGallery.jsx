import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ pictures }) => (
  <ul className={s.ImageGallery}>
    {pictures.map(({ id, webformatURL, largeformatURL }) => (
      <li key={id} className={s.ImageGalleryItem}>
        <ImageGalleryItem imageURL={webformatURL} />
      </li>
    ))}
  </ul>
);
