const initialState = {
  users: [],
  activeUser: {},
  order: {},
};

import { ADD, DELETE, UPDATE, UPLOAD } from './consts';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETACTIVE':
      return { ...state, activeUser: { ...action.payload } };
    case 'ADDPRODUCT':
      // debugger;
      console.log('this is from the redux:', state.order);
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.title]: {
            ...state.order[action.payload.title],
            title: action.payload.title,
            price: action.payload.price,
            amount: Math.max((state.order[action.payload.title]?.amount || 0) + action.payload.change, 0),
            // amount: action.payload.amount + action.payload.change,
          },
        },
      };

    case DELETE:
      return {
        ...state,
        order: {},
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.title]: {
            ...state.order[action.payload.title],
            amount: 0,
            // amount: action.payload.amount + action.payload.change,
          },
        },
      };

    case UPLOAD: {
      return { ...state, users: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
