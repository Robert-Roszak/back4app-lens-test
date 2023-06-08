import { createSlice, /*current,*/ PayloadAction } from '@reduxjs/toolkit';
import { CartModel } from '../types/interfaces';

interface CartState {
  items: CartModel[];
}

interface CommentModel {
  comment: string,
  id: string,
}

interface QuantityModel {
  quantity: number,
  id: string,
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const addItemToCart = (state: CartState, action: PayloadAction<CartModel>) => {
  const productInCart = action.payload;
  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  if (!received || received.length === 0) {
    received.push(productInCart);
    localStorage.setItem('cart', JSON.stringify(received));
  }
  else if (received != null && received.length >= 1) {
    const isInLocalStorage = received.some((item: CartModel) => item._id === productInCart._id);
    if (isInLocalStorage) {
      const toEdit = received.filter((item: CartModel) => item._id === productInCart._id);
      toEdit[0].quantity += productInCart.quantity;
      const toStay = received.filter((item: CartModel) => item._id !== productInCart._id);
      toStay.push(toEdit[0]);
      localStorage.setItem('cart', JSON.stringify(toStay));
    }
    else {
      received.push(productInCart);
      localStorage.setItem('cart', JSON.stringify(received));
    }
  }

  if (state.items.length > 0) {
    const foundIndex = state.items.findIndex(item => item._id === productInCart._id);
    if (foundIndex >= 0) {
      const newState = state.items;
      newState[foundIndex].quantity += productInCart.quantity;
      state.items = newState;
    }
    else state.items.push(productInCart);
  }
  else state.items = [productInCart];
};

const addCommentToProduct = (state: CartState, action: PayloadAction<CommentModel>) => {
  const comment = action.payload.comment;
  const id = action.payload.id;

  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const toEdit = received.filter((item: CartModel) => item._id === id);
  toEdit[0].comment = comment;
  const toStay = received.filter((item: CartModel) => item._id !== id);
  toStay.push(toEdit[0]);
  localStorage.setItem('cart', JSON.stringify(toStay));

  state.items.filter(item => {
    if (item._id === id) item.comment = comment;
    return state;
  });
};

const handleQuantity = (state: CartState, action: PayloadAction<QuantityModel>) => {
  const quantity = action.payload.quantity;
  const id = action.payload.id;

  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const toEdit = received.filter((item: CartModel) => item._id === id);
  toEdit[0].quantity += quantity;
  const toStay = received.filter((item: CartModel) => item._id !== id);
  toStay.push(toEdit[0]);
  localStorage.setItem('cart', JSON.stringify(toStay));

  state.items.map(item => {
    if (item._id === id) item.quantity += quantity;
    return state;
  });
};

const removeProductFromCart = (state: CartState, action: PayloadAction<{id: string}>) => {
  const id = action.payload.id;
  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const toStay = received.filter((item: CartModel) => item._id !== id);
  localStorage.setItem('cart', JSON.stringify(toStay));

  const index = state.items.findIndex(item => item._id === id);
  state.items.splice(index, 1);
};

const removeAllProductsFromCart = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify([]));
  state.items = [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addItemToCart,
    addComment: addCommentToProduct,
    changeQuantity: handleQuantity,
    removeFromCart: removeProductFromCart,
    clearCart: removeAllProductsFromCart,
  },
});

export const { addToCart, addComment, changeQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;