import { Component } from 'react';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.props.handleInputChange(e.target.value);
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.showPictures();
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button_label}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            className={s.SearchForm__input}
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
