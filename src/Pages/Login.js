import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
    const url = 'https://opentdb.com/api_token.php?command=request';
    const json = await fetch(url);
    const data = await json.json();
    localStorage.setItem('token', `${data.token}`);
    this.setState({ redirectPlay: true });
  };

  render() {
    const { user, email, disabled, redirectPlay } = this.state;
    if (redirectPlay === true) {
      return (
        <Redirect to="/Game" />
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
          <button
            type="button"
            data-testid="btn-settings"
          >
            <Link to="/settings">Configurações</Link>
          </button>

        </form>
      </div>
    );
  }
}

export default connect(null, null)(Login);
