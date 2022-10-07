import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

export const initialState = {
  isLoading: false,
};

export const types = {
  SET_LOADING: "SET_LOADING",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const UIContext = createContext(initialState);
UIContext.displayName = "UIContext";

export const UIProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Loading action
  const setLoading = useCallback((payload) => dispatch({ type: types.SET_LOADING, payload }), [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ ...state, setLoading }), [state]);

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};
