import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../components/loading';
import { fetchQuestion, fetchToken, requestUpdateState } from '../Redux/Actions';

class PlayGame extends Component {
  state = {
    indice: 0,
    allAnswers: [],
    iAnswers: [],
    click: false,
  };

  async componentDidMount() {
    const { fetchApiQuestion } = this.props;
    // await fetchApiToken();
    await fetchApiQuestion();
    this.fetchApi();
  }

  handleClick = () => {
    const { indice } = this.state;
    this.setState({ indice: indice + 1, click: false }, () => { this.randomAnswer(); });
  };

  fetchApi = () => {
    const { history, responseCode, updateState } = this.props;
    const CODE_RESPON = 3;
    if (responseCode === CODE_RESPON || responseCode === undefined) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      updateState();
      this.randomAnswer();
    }
  };

  dataTestValue = (answer, index) => {
    const { questions } = this.props;
    const { indice } = this.state;
    if (answer !== questions[indice].correct_answer) {
      return `wrong-answer-${index}`;
    } return 'correct-answer';
  };

  verifyCorrect = (answer) => {
    const { questions } = this.props;
    const { indice, click } = this.state;
    if (answer !== questions[indice].correct_answer && click === true) {
      return '3px solid red';
    }
    if (answer === questions[indice].correct_answer && click === true) {
      return '3px solid rgb(6, 240, 15)';
    }
    return '1px solid black';
  };

  onClick = () => this.setState({
    click: true,
  });

  randomAnswer = () => {
    const { questions } = this.props;
    const { indice } = this.state;
    const maxQuestions = 3;
    const correctAnswer = questions[indice].correct_answer;
    let iAnswers = [];
    const allAnswers = [correctAnswer, ...questions[indice].incorrect_answers];
    if (questions[indice].type === 'boolean') {
      iAnswers = [0, 1];
    } else {
      iAnswers = [0, 1, 2, maxQuestions];
    }
    for (let i = iAnswers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [iAnswers[i], iAnswers[j]] = [iAnswers[j], iAnswers[i]];
    }
    this.setState({ allAnswers, iAnswers });
  };

  render() {
    const aux = 3;
    const { isLoading, questions } = this.props;
    const { indice, iAnswers, allAnswers } = this.state;
    return (
      <div>
        <h1>Jogar</h1>
        { isLoading ? <Loading />
          : (
            <div>
              <h3 data-testid="question-category">{ questions[indice].category }</h3>
              <p data-testid="question-text">{ questions[indice].question }</p>
              { questions[indice].type === 'boolean'
                ? (
                  <section data-testid="answer-options">
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[0]], 0) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[0]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[0]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[1]], 1) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[1]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[1]]}
                    </button>
                  </section>)
                : (
                  <section data-testid="answer-options">
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[0]], 0) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[0]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[0]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[1]], 1) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[1]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[1]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[2]], 2) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[2]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[2]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[3]], aux) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[3]]) } }
                      onClick={ this.onClick }
                    >
                      {allAnswers[iAnswers[3]]}
                    </button>
                  </section>)}
              <button type="button" onClick={ this.handleClick }>PROXIMA</button>
            </div>
          )}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.gameReducer.isLoading,
  responseCode: state.gameReducer.allQuestions.response_code,
  questions: state.gameReducer.allQuestions.results,
  query: state.gameReducer.query,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiToken: () => dispatch(fetchToken()),
  fetchApiQuestion: () => dispatch(fetchQuestion()),
  updateState: () => dispatch(requestUpdateState()),
});

PlayGame.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
