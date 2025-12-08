import { RootState } from "../../store";

export const selectProductsTotalPrice = (state: RootState) =>
  state.cartReducer.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

export const selectProductsCount = (state: RootState) =>
  state.cartReducer.products.reduce((acc, product) => acc + product.quantity, 0);
