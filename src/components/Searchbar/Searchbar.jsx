import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  inputHandler = e => {
    this.setState({ searchWord: e.target.value });
  };

  submitHandler = e => {
    const { searchWord } = this.state;
    e.preventDefault();
    this.props.getPictures(searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.submitHandler}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.inputHandler}
            className="input"
            value={this.state.searchWord}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
