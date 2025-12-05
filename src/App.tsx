import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";

// Pages
import HomePage from "./components/pages/home/home.page";
import LoginPage from "./components/pages/login/login.page";
import SignUpPage from "./components/pages/sign-up/sign-up.page";
import ExplorePage from "./components/pages/explore/explore.page";

//Utilities
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/user.context";
import { userConverter } from "./converters/firestore.converter";

// Components
import LoadingComponent from "./components/loading/loading.component";
import CategoryDetailsPage from "./components/pages/category-details/category-details.page";
import Cart from "./components/cart/cart.component";
import AuthenticationGuard from "./components/guards/authentication.guard";
import CheckoutPage from "./components/pages/checkout/checkout.page";
import PaymentConfirmationPage from "./components/pages/payment-confirmation/payment-confirmation-page";

const App: FunctionComponent = () => {

  const [isInitializing, setIsInitializing] = useState(true);

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    //se o usuario estiver logado no contexto, e o usuario do firebase estiver null (signout)
    // devemos limpar o contexto (sign out)
    const isSigninOut = isAuthenticated && !user;
    if (isSigninOut) {
      logoutUser();

      return setIsInitializing(false);
    }

    //se o usuario for nulo no contexto, e nao for nulo no firebase
    //devemos fazer login
    const isSigninIn = !isAuthenticated && user;
    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

      loginUser(userFromFirestore);

      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  if (isInitializing) return <LoadingComponent />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
         <Route
          path="/checkout"
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route path='/payment-confirmation' element={<PaymentConfirmationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  );
}

export default App;
