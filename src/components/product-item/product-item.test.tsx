import { renderWithRedux } from '../helpers/test.helpers'
import Product from '../../types/product.types'
import ProductItem from './product-item.component'
import { screen } from '@testing-library/react'

describe('Product Item', () => {
  it('should show correct product', () => {
    const product: Product = {
      id: '1',
      imageUrl: 'image_url',
      name: 'Hat',
      price: 100
    }

    renderWithRedux(<ProductItem product={product} />, {})

    screen.getByText(/hat/i)
    screen.getByText('R$100')
    screen.getByText(/add to cart/i)
  })
})