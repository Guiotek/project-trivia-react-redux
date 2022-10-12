import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/loading';
import NextButton from '../components/nextButton';
import { fetchQuestion,
  sendScore, requestUpdateState, assertions } from '../Redux/Actions';
import Header from '../components/header';

class PlayGame extends Component {
  state = {
    indice: 0,
    allAnswers: [],
    iAnswers: [],
    click: false,
    showNextButton: false,
    isDisabled: false,
    timer: 30,
    isCounting: true,
    redirect: false,
  };

  async componentDidMount() {
    const { fetchApiQuestion } = this.props;
    await fetchApiQuestion();
    this.fetchApi();
    this.countDown();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer > 0) {
      this.countDown();
    }
    if (timer === 0) {
      this.setState({ timer: 30,
        isCounting: false,
        isDisabled: true,
        showNextButton: true });
    }
  }

  countDown = () => {
    const { timer, isCounting } = this.state;
    const timeLimit = 1000;
    if (isCounting) {
      return setTimeout(() => {
        this.setState({
          timer: timer - 1,
        });
      }, timeLimit);
    }
  };

  handleClick = () => {
    const { indice } = this.state;
    this.setState({ indice: indice + 1, click: false }, () => { this.randomAnswer(); });
    this.setState({ showNextButton: false,
      timer: 30,
      isDisabled: false,
      isCounting: true });
    const maxQuestions = 4;
    if (indice === maxQuestions) {
      this.setState({ redirect: true });
    }
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
    if (answer !== questions[indice].correct_answer) { return `wrong-answer-${index}`; }
    return 'correct-answer';
  };

  verifyCorrect = (answer) => {
    const { questions } = this.props;
    const { indice, click } = this.state;
    if (answer !== questions[indice].correct_answer && click === true) {
      return '3px solid red';
    } if (answer === questions[indice].correct_answer && click === true) {
      return '3px solid rgb(6, 240, 15)';
    } return '1px solid black';
  };

  randomAnswer = () => {
    const { questions } = this.props;
    const { indice } = this.state;
    const maxQuestions = 3;
    const maxIndex = 4;
    if (indice <= maxIndex) {
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
    }
  };

  chooseAnswer = (answer) => {
    const { questions, dispatchScore, dispatchAssertions } = this.props;
    const { indice, timer } = this.state;
    const { difficulty } = questions[indice];
    const correctAnswer = questions[indice].correct_answer;
    const defaultWin = 10;
    const aux = 3;
    let multiplier;
    let { score, assertionsCount } = this.props;
    if (difficulty === 'hard') {
      multiplier = aux;
    } else if (difficulty === 'medium') { multiplier = 2; } else { multiplier = 1; }
    this.setState({ showNextButton: true,
      click: true,
      isCounting: false,
      isDisabled: true });
    if (answer === correctAnswer) {
      score += defaultWin + (timer * multiplier);
      assertionsCount += 1;
    } dispatchScore(score);
    dispatchAssertions(assertionsCount);
  };

  render() {
    const aux = 3;
    const { isLoading, questions } = this.props;
    const { indice, iAnswers, allAnswers, showNextButton, isDisabled, timer, redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <Header />
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
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[0]]); } }
                      disabled={ isDisabled }
                    >
                      {allAnswers[iAnswers[0]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[1]], 1) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[1]]) } }
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[1]]); } }
                      disabled={ isDisabled }
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
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[0]]); } }
                      disabled={ isDisabled }

                    >
                      {allAnswers[iAnswers[0]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[1]], 1) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[1]]) } }
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[1]]); } }
                      disabled={ isDisabled }

                    >
                      {allAnswers[iAnswers[1]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[2]], 2) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[2]]) } }
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[2]]); } }
                      disabled={ isDisabled }

                    >
                      {allAnswers[iAnswers[2]]}
                    </button>
                    <button
                      data-testid={ this.dataTestValue(allAnswers[iAnswers[3]], aux) }
                      type="button"
                      style={ { border: this.verifyCorrect(allAnswers[iAnswers[3]]) } }
                      onClick={ () => { this.chooseAnswer(allAnswers[iAnswers[3]]); } }
                      disabled={ isDisabled }
                    >
                      {allAnswers[iAnswers[3]]}
                    </button>
                  </section>)}
              {showNextButton ? <NextButton handleClick={ this.handleClick } /> : null}
            </div>
          )}
        <h3>{timer}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.gameReducer.isLoading,
  responseCode: state.gameReducer.allQuestions.response_code,
  questions: state.gameReducer.allQuestions.results,
  query: state.gameReducer.query,
  isTimeOut: state.gameReducer.isTimeOut,
  assertionsCount: state.player.assertions,
  score: state.player.score,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (value) => dispatch(sendScore(value)),
  fetchApiQuestion: () => dispatch(fetchQuestion()),
  updateState: () => dispatch(requestUpdateState()),
  dispatchAssertions: (value) => dispatch(assertions(value)),
});
PlayGame.propTypes = {
  history: PropTypes.object,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
