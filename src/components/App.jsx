import { Component } from 'react';
import { fetchPictures } from 'services/picturesAPI';
import { picturesArrayFilter } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { query: '', searchDone: false, pictures: [], page: 1 };
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
    const arrayOfPictures = await fetchPictures(query, page);
    const arr = picturesArrayFilter(arrayOfPictures);
    this.setState(prevState => ({ pictures: [...prevState.pictures, ...arr] }));
    console.log(arr);
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
    const { pictures, query } = this.state;
    return (
      <div>
        <Searchbar
          showPictures={this.showPictures}
          query={query}
          handleInputChange={this.handleInputChange}
        />
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        {pictures.length > 0 && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
