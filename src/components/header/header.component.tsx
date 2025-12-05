import { signOut } from 'firebase/auth';
import { BsCart3} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Utilities
import { auth } from '../../config/firebase.config';
import { UserContext } from '../../contexts/user.context';

// Styles
import { HeaderContainer, HeaderItems, HeaderItem, HeaderTitle } from './header.styles';
import { CartContext } from '../../contexts/cart.context';

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(UserContext);
  const { productsCount, toggleCart } = useContext(CartContext);

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleLoginClick = () => { 
    navigate("/login");
  }

  const handleSignUpClick = () => {
    navigate("/sign-up");
  }

  const handleExploreClick = () => {
    navigate("/explore");
  }

  return (
    <HeaderContainer>
      <h2>
        <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      </h2>
        <HeaderItems>
          <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
          {!isAuthenticated && (
            <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
            </>
          )}

          {isAuthenticated && (
            <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
          )
            }
          <HeaderItem onClick={toggleCart}>
            <BsCart3 size={25} />
            <p style={ { marginLeft: 5 } }> {productsCount}</p>
          </HeaderItem>
        </HeaderItems>
      </ HeaderContainer>
  );
};

export default Header;
