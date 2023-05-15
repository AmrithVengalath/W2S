const initialState = {
  name:'',
  email:'',
  token: '',
};

const useReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER_FIELDS':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_USER_STORE':
      return initialState;
    default:
      return state;
  }
};
export default useReducer;
