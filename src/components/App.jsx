import { Component } from 'react';
import { fetchPictures } from 'services/picturesAPI';
import { picturesArrayFilter } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import s from './App.module.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      query: '',
      searchDone: false,
      pictures: [],
      page: 1,
      isLoading: false,
    };
  }

  componentDidUpdate(_, prevState) {
    const { searchDone, page } = this.state;

    if (searchDone !== prevState.searchDone || page !== prevState.page) {
      this.getPictures();
    }
  }

  handleInputChange(newQuery) {
    this.setState({ query: newQuery });
  }

  getPictures = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    const arrayOfPictures = await fetchPictures(query, page);
    const arr = picturesArrayFilter(arrayOfPictures);
    this.setState(prevState => ({ pictures: [...prevState.pictures, ...arr] }));
    this.setState({ isLoading: false });
  };

  showPictures = () => {
    this.setState(prevState => ({
      searchDone: !prevState.searchDone,
      pictures: [],
      page: 1,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { pictures, query, isLoading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar
          showPictures={this.showPictures}
          query={query}
          handleInputChange={this.handleInputChange}
        />
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        {isLoading && <Loader />}
        {pictures.length > 0 && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
