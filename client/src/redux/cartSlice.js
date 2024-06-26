import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    cart: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.cart += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const updatedProducts = state.products.filter(
        (product) => product._id !== productId
      );
      const updatedQuantity = updatedProducts.reduce(
        (accumulator, currentProduct) => accumulator + currentProduct.quantity,
        0
      );
      const updatedTotal = updatedProducts.reduce(
        (accProd, prod) => accProd + prod.price * prod.quantity,
        0
      );
      return {
        ...state,
        products: updatedProducts,
        quantity: updatedQuantity,
        total: updatedTotal,
        cart: updatedProducts.length,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        products: [],
        quantity: 0,
        total: 0,
        cart: 0,
      };
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
