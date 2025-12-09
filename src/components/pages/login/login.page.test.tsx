import userEvent from '@testing-library/user-event'
import * as firebaseAuth from 'firebase/auth'
import { AuthErrorCodes } from 'firebase/auth'

import { renderWithRedux } from '../../helpers/test.helpers'
import LoginPage from './login.page'
import { screen } from '@testing-library/react'

jest.mock('firebase/auth')

describe('Login', () => {
  it('should show erros when trying to submit without filling all required fields', async () => {
    renderWithRedux(<LoginPage />, {})

    const submitButton = screen.getByText('Sign In')

    userEvent.click(submitButton)

    await screen.findByText(/email is required/i)
    screen.getByText(/password is required/i)
  })

  it('should show error if email is invalid', async () => {
    renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = screen.getByPlaceholderText(/enter your email/i)

    userEvent.type(emailInput, 'invalid_email')

    const submitButton = screen.getByText('Sign In')
    userEvent.click(submitButton)

    await screen.findByText(/invalid email/i)
  })

  it('should show an error if email is not found', async () => {
    const mockFirebaseAuth = firebaseAuth as any

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.USER_DELETED })
    )

    renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = screen.getByPlaceholderText(/enter your email/i)

    userEvent.type(emailInput, 'lorem@ipsum.com')

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    userEvent.type(passwordInput, '12345678')

    const submitButton = screen.getByText('Sign In')

    userEvent.click(submitButton)

    await screen.findByText(/email not found/i)
  })

  it('should show an error if password is not valid', async () => {
    const mockFirebaseAuth = firebaseAuth as any

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.INVALID_PASSWORD })
    )

    renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = screen.getByPlaceholderText(/enter your email/i)

    userEvent.type(emailInput, 'lorem@ipsum.com')

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    userEvent.type(passwordInput, '123456')

    const submitButton = screen.getByText('Sign In')

    userEvent.click(submitButton)

    await screen.findByText(/password is invalid/i)
    })
})