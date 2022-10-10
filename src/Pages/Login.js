import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    user: '',
    email: '',
    disabled: true,
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

  handleClick = () => {
    const { history } = this.props;
    history.push('playgame');
  };

  render() {
    const { user, email, disabled } = this.state;
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Login);
