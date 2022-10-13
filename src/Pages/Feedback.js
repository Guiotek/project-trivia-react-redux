import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/header';

class Feedback extends Component {
  state = {
    feedback: '',
    redirectPlayAgain: false,
    redirectRanking: false,
  };

  componentDidMount() {
    this.returnFeedback();
  }

  returnFeedback = () => {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      this.setState({ feedback: 'Could be better...' });
    } else if (assertions >= three) {
      this.setState({ feedback: 'Well Done!' });
    }
  };

  playAgain = () => {
    this.setState({ redirectPlayAgain: true });
  };

  ranking = () => {
    this.setState({ redirectRanking: true });
  };

  render() {
    const { feedback, redirectPlayAgain, redirectRanking } = this.state;
    const { assertions, score } = this.props;
    if (redirectPlayAgain) {
      return <Redirect to="/" />;
    }
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }
    return (
      <div id="feedbackDiv">
        <Header />
        <h2
          data-testid="feedback-text"
          className="textStyle colorWhite"
        >
          { feedback }

        </h2>
        <h3
          data-testid="feedback-total-question"
          className="colorWhite"
        >
          {assertions}

        </h3>
        <h3
          data-testid="feedback-total-score"
          className="colorWhite"
        >
          {score}

        </h3>
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
          id="button_playAgain"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.ranking }
          data-testid="btn-ranking"
          id="button_ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
