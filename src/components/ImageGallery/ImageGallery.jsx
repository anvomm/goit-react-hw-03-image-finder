import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ pictures, openModal }) => (
  <ul className={s.ImageGallery}>
    {pictures.map(({ id, webformatURL, largeImageURL }) => (
      <li key={id} id={id} className={s.ImageGalleryItem}>
        <ImageGalleryItem
          imageURL={webformatURL}
          openModal={openModal}
          largeImageURL={largeImageURL}
        />
      </li>
    ))}
  </ul>
);
