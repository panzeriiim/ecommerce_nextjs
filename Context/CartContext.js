import { createContext, useReducer } from "react";

export const Cart = createContext();

const initialState = { cartItems: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === newItem.id);
      const cartItems = existItem
        ? state.cartItems.map((item) =>
            item.id === newItem.id ? newItem : item
          )
        : [...state.cartItems, newItem];
      return { ...state, cartItems };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { state, dispatch };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}
