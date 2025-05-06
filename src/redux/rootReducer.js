import { ADDPRODUCT, DELETE, REMOVE_FROM_CART, SETACTIVE, UPDATE_INVENTORY_BOUGHT, UPLOAD } from './consts';

const initialState = {
  users: [],
  activeUser: {},
  order: {},
  inventory_bought: {
    productinventory: 0,
    boughtPerProduct: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETACTIVE:
      return { ...state, activeUser: { ...action.payload } };
    case ADDPRODUCT:
      // debugger;
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.title]: {
            ...state.order[action.payload.title],
            title: action.payload.title,
            price: action.payload.price,
            amount: Math.max((state.order[action.payload.title]?.amount || 0) + action.payload.change, 0),
            category: action.payload.category,
            categoryId: action.payload.categoryId,
            bought: state.order[action.payload.title]?.bought || 0,
            inventory: state.order[action.payload.title]?.inventory || 0,
          },
        },
      };

    case UPDATE_INVENTORY_BOUGHT:
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.title]: {
            ...state.order[action.payload.title],
            title: action.payload.title,
            price: action.payload.price,
            amount: Math.max((state.order[action.payload.title]?.amount || 0) + action.payload.change, 0),
            category: action.payload.category,
            categoryId: action.payload.categoryId,
            bought: (state.order[action.payload.title]?.bought || 0) + action.payload.amount, // Accumulate bought
            inventory: Math.max((state.order[action.payload.title]?.inventory || 0) - action.payload.amount, 0), // Ensure no negative inventory
          },
        },
      };

    case DELETE:
      return {
        ...state,
        order: {},
      };

    case REMOVE_FROM_CART: {
      const newOrder = { ...state.order };
      delete newOrder[action.payload.title]; // Remove product from state

      return {
        ...state,
        order: newOrder,
      };
    }

    case UPLOAD: {
      return { ...state, users: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
