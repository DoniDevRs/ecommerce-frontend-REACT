import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../helpers/test.helpers'
import SignUpPage from './sign-up.page'
import { screen } from '@testing-library/react'

jest.mock('firebase/auth')

describe('Sign Up', () => {
  it('should show error when trying to submit without filling all required fields', async () => {
    renderWithRedux(<SignUpPage />, {})

    const submitButton = screen.getByText('Create Account', { selector: 'button' })

    userEvent.click(submitButton)

    await screen.findByText(/first name is required/i)
    screen.getByText(/last name is required/i)
    screen.getByText(/email is required/i)
    screen.getByText(/password is required/i)
    screen.getByText(/password confirmation is required/i)
  })

  it('should show error when filling an invalid email', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const emailInput = screen.getByPlaceholderText(/enter your email/i)

    userEvent.type(emailInput, 'invalid_email')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })
    userEvent.click(submitButton)

    await screen.findByText(/invalid email/i)
  })

  it('should show error when password and password confirmation are different', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const passwordConfirmationInput = screen.getByPlaceholderText(/confirm your password/i)

    userEvent.type(passwordInput, '123456')
    userEvent.type(passwordConfirmationInput, '12345678')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })

    userEvent.click(submitButton)

    await screen.findByText(/passwords do not match/i)
  })

  it('should show error when password has less than 6 characters', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)

    userEvent.type(passwordInput, '123')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })
    userEvent.click(submitButton)

    await screen.findByText(/password must be at least 6 characters/i)
  })
})