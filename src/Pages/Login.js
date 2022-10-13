import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { inputName, inputEmail } from '../Redux/Actions';
import logo from '../trivia.png';
// import './Login.css';

class Login extends Component {
  state = {
    user: '',
    email: '',
    disabled: true,
    redirectPlay: false,
    redirectSettings: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { user, email } = this.state;
      if (user.length > 0 && email.length > 0) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  play = async () => {
    const { sendName, sendEmail } = this.props;
    const { user, email } = this.state;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const json = await fetch(url);
    const data = await json.json();
    localStorage.setItem('token', `${data.token}`);
    sendName(user);
    sendEmail(email);
    this.setState({ redirectPlay: true });
  };

  settings = () => {
    this.setState({
      redirectSettings: true,
    });
  };

  render() {
    const { user, email, disabled, redirectPlay, redirectSettings } = this.state;
    if (redirectPlay === true) {
      return (
        <Redirect to="/playgame" />
      );
    }
    if (redirectSettings === true) {
      return (
        <Redirect to="/settings" />
      );
    }
    return (
      <div
        id="backGround"
      >
        <div id="initialDiv">
          <img src={ logo } className="App-logo" alt="logo" />
          <form className="forms">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                className="inputForms"
                data-testid="input-player-name"
                placeholder="USER"
                value={ user }
                onChange={ this.handleChange }
                name="user"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                placeholder="EMAIL"
                className="inputForms"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
              />
            </label>
            <button
              type="button"
              className="buttonLogin"
              id="buttonPlay"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ this.play }
            >
              Play
            </button>
            <button
              type="button"
              id="buttonSettings"
              className="buttonLogin"
              data-testid="btn-settings"
              onClick={ this.settings }
            >
              Configurações
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendName: (value) => dispatch(inputName(value)),
  sendEmail: (value) => dispatch(inputEmail(value)),
});

Login.propTypes = {
  sendName: PropTypes.func,
  sendEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
