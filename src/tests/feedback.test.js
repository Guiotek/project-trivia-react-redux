import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../Pages/Feedback';

describe('testes pagina Feedback', () => {
  test('se os componentes existem:', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedback = screen.getByTestId('feedback-text');
    const feedbackTotal = screen.getByTestId('feedback-total-question');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(feedback).toBeInTheDocument();
    expect(feedbackTotal).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });
});
describe('testes botoes pagina Feedback', () => {
  test('se o botao play Again redireciona:', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });
  test('se os componentes existem:', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });
});
