export function userReducer(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return payload;

    default:
      return state;
  }
}
