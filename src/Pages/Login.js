import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { inputName, inputEmail } from '../Redux/Actions';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    user: '',
    email: '',
    disabled: true,
    redirectPlay: false,
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

  render() {
    const { user, email, disabled, redirectPlay } = this.state;
    if (redirectPlay === true) {
      return (
        <Redirect to="/playgame" />
      );
    }
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
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
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
            onClick={ this.play }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
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
