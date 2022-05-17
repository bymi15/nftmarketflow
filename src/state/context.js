import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';

const initialState = {
  user: null,
  ipfsAPIKey: '',
  loggedIn: false,
  collectionReady: false,
  collection: [],
  salesCollection: [],
  loading: false,
  loadingText: '',
  saleItemsError: null,
  saleItems: [],
  currency: null,
  activities: [],
};

const GlobalContext = createContext({
  dispatch: () => null,
  state: initialState,
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GlobalContext.Provider value={{ dispatch, state }}>{children}</GlobalContext.Provider>;
};
