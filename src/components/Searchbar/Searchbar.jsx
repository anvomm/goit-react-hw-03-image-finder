import { Component } from 'react';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.props.handleInputChange(e.target.value);
  }
  state = {
    searchWord: '',
  };

  /*  inputHandler = e => {
    this.setState({ searchWord: e.target.value });
  }; */

  submitHandler = e => {
    const { searchWord } = this.state;
    e.preventDefault();
    this.props.showPictures();
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
            onChange={this.handleInputChange}
            className="input"
            value={this.props.query}
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
