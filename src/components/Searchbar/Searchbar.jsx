import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  constructor() {
    super();
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

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  showPictures: PropTypes.func.isRequired,
};
