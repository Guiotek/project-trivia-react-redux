import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class nextButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        type="button"
        onClick={ handleClick }
        data-testid="btn-next"
        className="buttonN"
      >
        Next
      </button>
    );
  }
}

nextButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
