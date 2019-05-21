export const doSignIn = credientials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credientials.email, credientials.password)
      .then(resp => {
        dispatch({ type: "LOGIN_SUCESS", uid: resp.user.uid });
      })
      .catch(err => dispatch({ type: "LOGIN_ERROR", error: err }));
  };
};

export const doSignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: "SIGNOUT_SUCESS" }));
  };
};

export const doSignUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        //creating a reference for accessing user collection of data (for later user: used for updating fields by doc id)
        firestore
          .collection("data")
          .doc(resp.user.uid)
          .set({}); //{} is for just creating empty doc for the specific user

        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
      })
      .then(resp => dispatch({ type: "SIGNUP_SUCESS", uid: resp.user.uid }))
      .catch(err => dispatch({ type: "SIGNUP_ERROR", err }));
  };
};

export const doResetPassword = emailAddress => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
  

    firebase.auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        dispatch({ type: "RESET_SUCESS" });
      })
      .catch(function(err) {
        dispatch({ type: "RESET_ERROR", err });
      });
  };
};

export const doSetUserId = userId => {
  return dispatch => {
    dispatch({ type: "SET_USER_ID", uid: userId });
  };
};
