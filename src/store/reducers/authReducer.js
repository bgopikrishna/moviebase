const INIT_STATE = {
  authError: null,
  userId: null
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login Failed"
      };
    case "LOGIN_SUCESS":
      console.log("Login Success");
      return {
        ...state,
        authError: null,
        userId: action.uid
      };
    case "SIGNOUT_SUCESS":
      console.log("signed out sucess");

      return {
        ...state,
        userId: null
      };
    case "SIGNUP_SUCESS":
      console.log("signed up sucess");

      return {
        ...state,
        authError: null,
        userId: action.uid

      };
    case "SIGNUP_ERROR":
      console.log("sign up error");

      return {
        ...state,
        authError: action.err.message
      };

    case "SET_USER_ID":  return {
      ...state,
      authError: null,
      userId: action.uid
    }; 

    default:
      return state;
  }
};

export default authReducer;
