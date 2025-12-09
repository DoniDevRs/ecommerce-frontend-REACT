import * as firestore from 'firebase/firestore'
import { renderWithRedux} from '../helpers/test.helpers'
import Category from '../../types/category.type'
import CategoriesOverview from './categories-overview.component'
import { screen } from '@testing-library/react'

jest.mock('firebase/firestore')

describe('Categories Overview', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockImplementation(async () => [
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
    ])

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {}
    }))

    renderWithRedux(
      <CategoriesOverview />,
      {}
    )

    await screen.findByText(/hat/i)
    screen.getByText('Lorem Ipsum')
    screen.getByText('R$100')
  })
})