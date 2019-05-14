const INIT_STATE = {
  authError: null,
  authState: null
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
        authError: null
      };
    case "SIGNOUT_SUCESS":
      console.log("signed out sucess");

      return {
        ...state
      };
    case "SIGNUP_SUCESS":
      console.log("signed up sucess");

      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("sign up error");

      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
