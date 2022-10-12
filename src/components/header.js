import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class header extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const trimEmail = email.trim();
    const lowercaseEmail = trimEmail.toLowerCase();
    const hash = md5(lowercaseEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
  }

  render() {
    const { name } = this.props;
    const { url } = this.state;
    return (
      <header>
        <img src={ url } alt="Foto do usuário" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(header);
