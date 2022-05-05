import Cookies from 'js-cookie';
const initialValues = Cookies.get('user')
  ? JSON.parse(Cookies.get('user'))
  : null;

export function userReducer(state = initialValues, action) {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return payload;

    case 'ACTIVATE':
      return { ...state, verified: true };

    case 'UPDATE_PICTURE':
      return { ...state, picture: payload };

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
}
