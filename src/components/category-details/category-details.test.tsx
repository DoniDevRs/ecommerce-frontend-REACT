import * as firestore from 'firebase/firestore'
import { renderWithRedux} from '../helpers/test.helpers'
import Category from '../../types/category.type'
import CategoryDetails from './category-details.component'
import { screen } from '@testing-library/react'

jest.mock('firebase/firestore')

describe('Category Details', () => {
  it('should fetch and show categories and its products', async () => {
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockImplementation(async () => ({
      docs: [
        {
          data(): Category {
            return {
              id: '1',
              displayName: 'Lorem Ipsum',
              imageUrl: 'image_url',
              name: 'lorem-ipsum',
              products: [
                { id: '1', name: 'Hat', price: 100, imageUrl: 'image_url' }
              ]
            }
          }
        }
      ]
    }))

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {}
    }))

    mockedFirestore.query.mockImplementation(() => {})
    mockedFirestore.where.mockImplementation(() => {})

    renderWithRedux(
      <CategoryDetails categoryId="any_id" />,
      {}
    )

    await screen.findByText('Explore Lorem Ipsum')
    screen.getByText(/hat/i)
    screen.getByText('R$100')
  })
})