import { createContext, useCallback, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = {
  items: [],
};

function addOrIncreaseItem(items, itemToAdd) {
  const existingIem = items.find((item) => item.id === itemToAdd.id);

  if (existingIem) {
    return items.map((item) =>
      item.id === itemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...items, { ...itemToAdd, quantity: 1 }];
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: addOrIncreaseItem(state.items, action.payload),
      };

    case "DECREASE_ITEM":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const decreaseItem = useCallback((item) => {
    dispatch({ type: "DECREASE_ITEM", payload: item.id });
  }, []);

  const removeItem = useCallback((item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item.id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totals = useMemo(() => {
    return state.items.reduce(
      (summary, item) => {
        summary.totalItems += item.quantity;
        summary.totalAmount += item.quantity * item.price;
        return summary;
      },
      { totalItems: 0, totalAmount: 0 },
    );
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems: totals.totalItems,
      totalAmount: totals.totalAmount,
      addItem,
      decreaseItem,
      removeItem,
      clearCart,
    }),
    [
      addItem,
      decreaseItem,
      clearCart,
      removeItem,
      state.items,
      totals.totalAmount,
      totals.totalItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
