import React from 'react';
import style from './ClassComponent.module.css';
import ProTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      count: 0,
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min)) +
        this.props.min,
      guessed: false,
    };
  }

  handleClick = (e) => {
    this.setState(() => ({
      count: 0,
      guessed: false,
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min)) +
        this.props.min,
      result: 'Результат',
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      count: state.count + 1,
    }));
    this.setState((state) => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
         попыток ${state.count}`,
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
          />
          <button className={style.btn}>Угадать</button>
          {this.state.guessed && (
            <button onClick={this.handleClick} className={style.btn}>
              Сыграть ещё
            </button>
          )}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: ProTypes.number,
  max: ProTypes.number,
};
