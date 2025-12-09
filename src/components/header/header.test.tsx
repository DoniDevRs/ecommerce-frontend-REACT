import { renderWithRedux } from '../helpers/test.helpers'
import CartProduct from '../../types/cart.type'
import Header from './header.component'
import { screen } from '@testing-library/react'

describe('Header', () => {
  it('should show sign out button if user is authenticated', () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: true } } as any
    })

    screen.getByText(/sign out/i)
  })

  it('should show sign in and sign up button if user is not authenticated', () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: false } } as any
    })

    screen.getByText(/login/i)
    screen.getByText(/create account/i)
  })

  it('should show correct cart products count', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        imageUrl: 'image_url',
        name: 'Hat',
        price: 100,
        quantity: 10
      },
      {
        id: '2',
        imageUrl: 'image_url',
        name: 'Jacket',
        price: 100,
        quantity: 12
      }
    ]

    renderWithRedux(<Header />, {
      preloadedState: {
        cartReducer: {
          products
        }
      } as any
    })

    screen.getByText('22')
  })
})