export const signIn = credentials => {
  return (dispatch, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .login(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.logout().then(() => {
      dispatch({ type: "SIGNOUT_SUCCESS" });
    });
  };
};

export const signUp = newUser => {
  return (dispatch, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .createUser(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
