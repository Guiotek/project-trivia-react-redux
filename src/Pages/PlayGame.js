import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../components/loading';
import { fetchQuestion, fetchToken, requestUpdateState } from '../Redux/Actions';

class PlayGame extends Component {
  state = {
    indice: 0,
  };

  async componentDidMount() {
    const { fetchApiQuestion, fetchApiToken } = this.props;
    await fetchApiToken();
    await fetchApiQuestion();
    this.fetchApi();
  }

  handleClick = () => {
    const { indice } = this.state;
    this.setState({ indice: indice + 1 });
  };

  fetchApi = () => {
    const { history, responseCode, updateState } = this.props;
    const CODE_RESPON = 3;
    if (responseCode === CODE_RESPON || responseCode === undefined) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      updateState();
    }
  };

  render() {
    const { isLoading, questions } = this.props;
    const { indice } = this.state;
    return (
      <div>
        <h1>Jogar</h1>
        { isLoading ? <Loading />
          : (
            <div>
              <h3 data-testid="question-category">{ questions[indice].category }</h3>
              <p data-testid="question-text">{ questions[indice].question }</p>
              <section data-testid="answer-options">
                { questions[indice].type === 'boolean'
                  ? (
                    <div>
                      <div>
                        <button
                          data-testid="correct-answer"
                          type="button"
                        >
                          {questions[indice].correct_answer}
                        </button>
                      </div>
                      <div>
                        <button
                          data-testid={ `wrong-answer-${0}` }
                          type="button"
                        >
                          {questions[indice].incorrect_answers[0]}
                        </button>
                      </div>
                    </div>)
                  : (
                    <div>
                      <div>
                        <button
                          data-testid="correct-answer"
                          type="button"
                        >
                          {questions[indice].correct_answer}
                        </button>
                      </div>
                      <div>
                        <button
                          data-testid={ `wrong-answer-${0}` }
                          type="button"
                        >
                          {questions[indice].incorrect_answers[0]}
                        </button>
                      </div>
                      <div>
                        <button
                          data-testid={ `wrong-answer-${1}` }
                          type="button"
                        >
                          {questions[indice].incorrect_answers[1]}
                        </button>
                      </div>
                      <div>
                        <button
                          data-testid={ `wrong-answer-${2}` }
                          type="button"
                        >
                          {questions[indice].incorrect_answers[2]}
                        </button>
                      </div>
                    </div>)}
              </section>
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
  history: PropTypes.shape().isRequired,
  fetchApiQuestion: PropTypes.shape().isRequired,
  fetchApiToken: PropTypes.shape().isRequired,
  responseCode: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  questions: PropTypes.shape().isRequired,
  updateState: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
