import { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeOnOverlayCLick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div className={s.Overlay} onClick={this.closeOnOverlayCLick}>
        <div className={s.Modal}>
          <img
            className={s.Modal__image}
            src={this.props.largeImageURL}
            alt=""
          />
        </div>
      </div>
    );
  }
}
