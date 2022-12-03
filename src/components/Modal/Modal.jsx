import { Component } from 'react';
import s from './Modal.module.css';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';

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
          <button
            className={s.CloseBtn}
            type="button"
            onClick={() => this.props.closeModal()}
          >
            <IconContext.Provider value={{ size: 30, color: 'white' }}>
              <CgClose />
            </IconContext.Provider>
          </button>
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
