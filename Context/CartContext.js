import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Cart = createContext();

const initialState = {
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems"))
    : [],
};

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
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };
    }
    case "CART_REMOVE_ITEM": {
      const removedItemId = action.payload;
      const cartItems = state.cartItems.filter(
        (item) => item.id !== removedItemId
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };
    }
    case "ITEM_UPDATE_QUANTITY": {
      const updatedItem = action.payload;
      const cartItems = state.cartItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
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
