const INIT_STATE = {
  authError: null,
  userId: null
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login Failed"
      };
    case "LOGIN_SUCESS":
      return {
        ...state,
        authError: null,
        userId: action.uid
      };
    case "SIGNOUT_SUCESS":
      return {
        ...state,
        userId: null
      };
    case "SIGNUP_SUCESS":
      return {
        ...state,
        authError: null,
        userId: action.uid
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      };

    case "SET_USER_ID":
      return {
        ...state,
        authError: null,
        userId: action.uid
      };
    case "RESET_SUCESS":
      return {
        ...state,
        authError: null
      };
    case "RESET_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
