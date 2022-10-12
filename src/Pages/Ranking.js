import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  handleClick = (btn) => {
    const { history } = this.props;
    btn.preventDefault();
    history.push('/');
  };

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;
