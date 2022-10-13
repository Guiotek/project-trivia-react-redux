import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { sendEmail, sendName } from '../Redux/Actions';

class header extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const { email, dispatchEmail, dispatchName, name } = this.props;
    const trimEmail = email.trim();
    const lowercaseEmail = trimEmail.toLowerCase();
    const hash = md5(lowercaseEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
    dispatchName(name);
    dispatchEmail(email);
  }

  render() {
    const { name, score } = this.props;
    const { url } = this.state;
    return (
      <header>
        <img
          src={ url }
          alt="Foto do usuário"
          data-testid="header-profile-picture"
          id="userImage"
        />
        <h2
          data-testid="header-player-name"
          className="textStyle colorWhite"
        >
          User:
          {name}
        </h2>
        <h2
          data-testid="header-score"
          className="textStyle colorWhite"
        >
          Score:
          {score}
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (value) => dispatch(sendEmail(value)),
  dispatchName: (value) => dispatch(sendName(value)),
});

header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(header);
