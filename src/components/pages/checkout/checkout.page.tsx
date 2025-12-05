import { FunctionComponent } from 'react'

// Components
import Checkout from '../../checkout/checkout.component'
import Header from '../../header/header.component'

const CheckoutPage: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Checkout />
    </>
  )
}

export default CheckoutPage