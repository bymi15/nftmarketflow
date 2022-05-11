export function loginUserAction(dispatch, user) {
  dispatch({
    payload: user,
    type: 'LOGIN_USER',
  });
}

export function logoutUserAction(dispatch) {
  dispatch({
    type: 'LOGOUT_USER',
  });
}

export function loggingInUserAction(dispatch) {
  dispatch({
    type: 'LOGGING_IN_USER',
  });
}
