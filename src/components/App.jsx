import { Component } from 'react';
import { fetchPictures } from 'services/picturesAPI';
import { picturesArrayFilter } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    pictures: [],
  };

  getPictures = async searchWord => {
    const arrayOfPictures = await fetchPictures(searchWord);
    const arr = picturesArrayFilter(arrayOfPictures);
    this.setState(prevState => ({ pictures: [...prevState.pictures, ...arr] }));
    console.log(arr);
  };
  render() {
    return (
      <div>
        <Searchbar getPictures={this.getPictures} />
        {this.state.pictures.length > 0 && (
          <ImageGallery pictures={this.state.pictures} />
        )}
      </div>
    );
  }
}
