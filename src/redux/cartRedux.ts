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

  if (received.length === 0) {
    received.push(productInCart);
  } else {
    const existingItem = received.find((item: CartModel) => item._id === productInCart._id);
    if (existingItem) {
      existingItem.quantity += productInCart.quantity;
    } else {
      received.push(productInCart);
    }
  }

  localStorage.setItem('cart', JSON.stringify(received));

  const existingStateItem = state.items.find(item => item._id === productInCart._id);
  if (existingStateItem) {
    existingStateItem.quantity += productInCart.quantity;
  } else {
    state.items.push(productInCart);
  }
};

const addCommentToProduct = (state: CartState, action: PayloadAction<CommentModel>) => {
  const comment = action.payload.comment;
  const id = action.payload.id;

  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const updatedItem = received.map((item: CartModel) => {
    if (item._id === id) {
      return { ...item, comment: comment };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(updatedItem));

  state.items.forEach(item => {
    if (item._id === id) {
      item.comment = comment;
    }
  });
};

const handleQuantity = (state: CartState, action: PayloadAction<QuantityModel>) => {
  const quantity = action.payload.quantity;
  const id = action.payload.id;

  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const updatedItem = received.map((item: CartModel) => {
    if (item._id === id) {
      return { ...item, quantity: item.quantity + quantity };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(updatedItem));

  state.items.forEach(item => {
    if (item._id === id) {
      item.quantity += quantity;
    }
  });
};

const removeProductFromCart = (state: CartState, action: PayloadAction<{ id: string }>) => {
  const id = action.payload.id;
  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  const updatedItem = received.filter((item: CartModel) => item._id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedItem));

  const index = state.items.findIndex(item => item._id === id);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
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