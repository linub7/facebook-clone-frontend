export function photosReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'PHOTOS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'PHOTOS_SUCCESS':
      return { ...state, loading: false, photos: payload, error: '' };
    case 'PHOTOS_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
