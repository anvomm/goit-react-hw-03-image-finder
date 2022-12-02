import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => (
  <ul className="gallery">
    {pictures.map(({ id, webformatURL, largeformatURL }) => (
      <li key={id} className="gallery-item">
        <ImageGalleryItem imageURL={webformatURL} />
      </li>
    ))}
  </ul>
);
