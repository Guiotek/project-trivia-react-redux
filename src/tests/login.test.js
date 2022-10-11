import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../Pages/Login';
import App from '../App';

describe('testes pagina Login', () => {
  const usuario = {
    nome: 'teste',
    email: 'example@test.com',
  };
  test('se componentes existem', () => {
    renderWithRouterAndRedux(<Login />);
    const nome = screen.getByRole('textbox', {
      name: /name:/i
    })
    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const botao = screen.getByRole('button', {
      name: /play/i,
    });
    const settings = screen.getByRole('button', {
      name: /configurações/i
    })
    expect(nome).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });
  test('botao disabled', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByRole('textbox', {
      name: /email/i,
    }), usuario.email);
    expect(screen.getByText(/Play/i).closest('button')).toBeDisabled();
  });
  test('botao enabled', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByRole('textbox', {
      name: /email/i,
    }), usuario.email);
    userEvent.type(screen.getByRole('textbox', {
      name: /name/i,
    }), usuario.nome);
    expect(screen.getByText(/Play/i).closest('button')).not.toBeDisabled();
  });
});
describe('Teste de rotas', () => {
  const usuario = {
    nome: 'teste',
    email: 'example@test.com',
    path: '/playgame',

  };
  test('rota PlayGame a partir do botao', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    const inputName = screen.getByRole('textbox', {
      name: /name:/i,
    });
    const inputButton = screen.getByRole('button', {
      name: /play/i,
    });
    expect(inputButton).toBeDisabled();
    userEvent.type(inputEmail, usuario.email)
    userEvent.type(inputName, usuario.nome);
    expect(inputButton).not.toBeDisabled();
    userEvent.click(inputButton);
  });
  describe('Testa o fetch e o local storage', () => {
    it('Testa se o fetch é chamado salvando token no local storage', () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            "response_code":0,
            "response_message":"Token Generated Successfully!",
            "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
          }),
        })
      );
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    const inputName = screen.getByRole('textbox', {
      name: /name:/i,
    });
    const inputButton = screen.getByRole('button', {
      name: /play/i,
    });
    userEvent.type(inputEmail, usuario.email)
    userEvent.type(inputName, usuario.nome);
    userEvent.click(inputButton);
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    });
  });
});
