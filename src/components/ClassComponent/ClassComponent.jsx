import React from 'react';
import style from './ClassComponent.module.css';
import ProTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: `Угадайте число в диапазоне от ${this.props.min} до ${this.props.max}`,
      userNumber: '',
      count: 0,
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min)) +
        this.props.min,
      guessed: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => {
      if (state.guessed) {
        return {
          count: 0,
          guessed: false,
          randomNumber:
            Math.floor(Math.random() * (this.props.max - this.props.min)) +
            this.props.min,
          result: `Угадайте число в диапазоне от ${this.props.min} до ${this.props.max}`,
        };
      }

      if (state.userNumber === '') {
        return {
          result: 'Введите число',
        };
      }
      if (
        state.userNumber > this.props.max ||
        state.userNumber < this.props.min
      ) {
        return {
          result: `Ввидите число из диапозона от ${this.props.min} до ${this.props.max}`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
          count: state.count + 1,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
          count: state.count + 1,
        };
      }
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
         попыток ${state.count + 1} `,
        userNumber: '',
        guessed: true,
      };
    });
  };
  handleChange = (e) => {
    this.setState(() => ({
      userNumber: e.target.value,
    }));
  };
  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.guessed}
          />
          <button className={style.btn}>
            {this.state.guessed ? 'Сыграть ещё' : 'Угадать'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: ProTypes.number,
  max: ProTypes.number,
};
