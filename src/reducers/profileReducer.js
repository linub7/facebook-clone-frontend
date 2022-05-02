export function profileReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'PROFILE_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'PROFILE_SUCCESS':
      return { ...state, loading: false, profile: payload, error: '' };
    case 'PROFILE_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
