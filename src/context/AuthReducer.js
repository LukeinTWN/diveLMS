//AuthReducer.js
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
      ...state,
      ...action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    case "UPDATE_USER": {
      return {
          ...state,
          ...action.payload,
        };
      
    }
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
    
  }
};

export default AuthReducer;
