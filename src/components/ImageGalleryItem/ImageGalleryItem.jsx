import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageURL, largeImageURL, openModal }) => (
  <img
    className={s.ImageGalleryItem__image}
    src={imageURL}
    alt=""
    onClick={() => {
      openModal(largeImageURL);
    }}
  />
);
