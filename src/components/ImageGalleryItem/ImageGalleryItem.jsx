import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageURL }) => (
  <img className={s.ImageGalleryItem__image} src={imageURL} alt="" />
);
