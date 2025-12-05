import { FunctionComponent, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'

// Utilities
import { CartContext } from '../../contexts/cart.context'

// Components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import { useNavigate } from 'react-router-dom'

const Cart: FunctionComponent = () => {
  const { isVisible, products, productsTotalPrice, productsCount,toggleCart } = useContext(CartContext)

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
    toggleCart();
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton startIcon={<BsCartCheck />} onClick={handleCheckoutClick}>
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount === 0 && (
          <p>Seu carrinho está vazio</p>
        )}

      </CartContent>
    </CartContainer>
  );
}

export default Cart