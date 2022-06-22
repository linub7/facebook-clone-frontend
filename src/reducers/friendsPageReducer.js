export function friendsPageReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'FRIENDS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FRIENDS_SUCCESS':
      return { ...state, loading: false, data: payload, error: '' };
    case 'FRIENDS_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
