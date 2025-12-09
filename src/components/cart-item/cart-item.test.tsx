import { renderWithRedux } from '../helpers/test.helpers'
import CartProduct from '../../types/cart.type'
import CartItem from './cart-item.component'
import { screen } from '@testing-library/react'

describe('Cart Item', () => {
  it('should show correct cart item', () => {
    const cartItem: CartProduct = {
      id: '1',
      imageUrl: 'image_url',
      name: 'Hat',
      price: 100,
      quantity: 1
    }

    renderWithRedux(
      <CartItem product={cartItem} />,
      {}
    )

    screen.getByText(/hat/i)
    screen.getByText('R$100')
    screen.getByText('1')
    screen.getByLabelText(/increase quantity of hat/i)
    screen.getByLabelText(/decrease quantity of hat/i)
    screen.getByLabelText(/remove hat/i)
  })
})