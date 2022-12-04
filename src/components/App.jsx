import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from 'services/picturesAPI';
import { filterPicturesArray } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from './App.module.css';

export class App extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      query: '',
      searchWord: '',
      searchDone: false,
      pictures: [],
      page: 1,
      isLoading: false,
      currentImage: null,
      idToScrollTo: '',
      modalShown: false,
    };
  }

  componentDidUpdate(_, prevState) {
    const { searchDone, page, modalShown } = this.state;

    if (searchDone !== prevState.searchDone || page !== prevState.page) {
      this.getPictures();
    }

    if (page !== 1 && !modalShown) {
      const y =
        document.getElementById(this.state.idToScrollTo).getBoundingClientRect()
          .top +
        window.scrollY -
        80;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }

  handleInputChange(newQuery) {
    const searchQuery = newQuery.trim();
    this.setState({ query: searchQuery });
  }

  getPictures = async () => {
    const { searchWord, page } = this.state;

    this.setState({ isLoading: true });

    const arrayOfPictures = await fetchPictures(searchWord, page);
    const arr = filterPicturesArray(arrayOfPictures);
    if (arr.length === 0) {
      this.setState({ isLoading: false });
      return this.notifyAboutWrongQuery();
    }
    this.setState({ idToScrollTo: arr[0].id, modalShown: false });
    this.setState(prevState => ({ pictures: [...prevState.pictures, ...arr] }));
    this.setState({ isLoading: false });
  };

  showPictures = () => {
    this.setState(prevState => ({
      searchDone: !prevState.searchDone,
      pictures: [],
      searchWord: prevState.query,
      query: '',
      page: 1,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = imageURL => {
    this.setState({
      currentImage: imageURL,
      modalShown: true,
    });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  notifyAboutWrongQuery() {
    toast.error('☹️ No pictures found, please try another search query!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }

  render() {
    const { pictures, query, isLoading, currentImage } = this.state;
    return (
      <div className={s.App}>
        <Searchbar
          showPictures={this.showPictures}
          query={query}
          handleInputChange={this.handleInputChange}
        />
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            openModal={this.openModal}
            query={query}
          />
        )}
        {isLoading && <Loader />}
        {pictures.length > 0 && <Button loadMore={this.loadMore} />}
        {currentImage && (
          <Modal
            query={query}
            largeImageURL={currentImage}
            closeModal={this.closeModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
