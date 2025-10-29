import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer
const cartReducer = (state, action) => {
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.productId?.price || 0) * (item.qty || 0);
    }, 0);
    return Math.round(total * 100) / 100;
  };

  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CART_ACTIONS.SET_CART:
      const items = action.payload.cartItems || [];
      return {
        ...state,
        loading: false,
        items,
        total: action.payload.total || calculateTotal(items),
        error: null,
      };

    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(
        item => item.productId._id === action.payload.productId._id
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId._id === action.payload.productId._id
            ? { ...item, qty: item.qty + action.payload.qty }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };

    case CART_ACTIONS.UPDATE_ITEM:
      const updatedItems = state.items.map(item =>
        item._id === action.payload._id ? action.payload : item
      );

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item._id !== action.payload);

      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.get();
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to fetch cart items',
      });
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (productId, qty = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.add(productId, qty);
      
      // Update state directly instead of calling fetchCart to avoid circular dependency
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: response.data,
      });
      
      toast.success('Item added to cart!');
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      throw error;
    }
  }, []); // Removed fetchCart dependency

  // Update cart item quantity
  const updateCartItem = useCallback(async (itemId, qty) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.update(itemId, qty);
      
      dispatch({
        type: CART_ACTIONS.UPDATE_ITEM,
        payload: response.data.cartItem,
      });
      
      toast.success('Cart updated!');
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      const message = error.response?.data?.message || 'Failed to update cart item';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      throw error;
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      await cartAPI.remove(itemId);
      
      dispatch({
        type: CART_ACTIONS.REMOVE_ITEM,
        payload: itemId,
      });
      
      toast.success('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      throw error;
    }
  }, []);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      await cartAPI.clear();
      
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      toast.success('Cart cleared!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      throw error;
    }
  }, []);

  // Get item count
  const getItemCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.qty, 0);
  }, [state.items]);

  // Check if product is in cart
  const isInCart = useCallback((productId) => {
    return state.items.some(item => item.productId._id === productId);
  }, [state.items]);

  // Get cart item by product ID
  const getCartItem = useCallback((productId) => {
    return state.items.find(item => item.productId._id === productId);
  }, [state.items]);

  const value = {
    // State
    items: state.items,
    total: state.total,
    loading: state.loading,
    error: state.error,
    
    // Actions
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    
    // Helpers
    getItemCount,
    isInCart,
    getCartItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;