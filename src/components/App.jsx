import { Component } from 'react';
import { fetchPictures } from 'services/picturesAPI';
import { picturesArrayFilter } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchWord: '',
  };

  getPictures = async searchWord => {
    const arrayOfPictures = await fetchPictures(searchWord);
    const arr = picturesArrayFilter(arrayOfPictures);
    console.log(arr);
  };
  render() {
    return (
      <div>
        <Searchbar getPictures={this.getPictures} />
      </div>
    );
  }
}
