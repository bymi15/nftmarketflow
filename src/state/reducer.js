export function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload, loggedIn: true };
    case 'LOGOUT_USER':
      return { ...state, user: null, loggedIn: false };
    case 'INIT_COLLECTION':
      return { ...state, collectionReady: true };
    case 'SET_COLLECTION':
      return { ...state, collectionReady: true, collection: action.payload };
    case 'RESET_COLLECTION':
      return { ...state, collectionReady: false, collection: [] };
    case 'SET_SALES_COLLECTION':
      return { ...state, salesCollection: action.payload };
    case 'RESET_SALES_COLLECTION':
      return { ...state, salesCollection: [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload?.status, loadingText: action.payload?.text };
    case 'API_GET_SALE_ITEMS':
      return { ...state, saleItemsError: null, saleItems: action.payload };
    case 'API_UPSERT_SALE_ITEM':
      return {
        ...state,
        saleItemsError: null,
        saleItems: [...state.saleItems.filter((i) => i._id !== action.payload._id), action.payload],
      };
    case 'API_REMOVE_SALE_ITEM':
      return {
        ...state,
        saleItemsError: null,
        saleItems: state.saleItems.filter((i) => i._id !== action.payload),
      };
    case 'API_ERROR_SALE_ITEMS':
      return { ...state, saleItemsError: action.payload };
    case 'API_GET_IPFS_API_KEY':
      return { ...state, ipfsAPIKey: action.payload };
    case 'API_GET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'API_GET_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'API_INSERT_ACTIVITY':
      return { ...state, activities: [...state.activities, action.payload] };
    default:
      return state;
  }
}
