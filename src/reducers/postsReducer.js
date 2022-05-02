export function postsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'POSTS_SUCCESS':
      return { ...state, loading: false, posts: payload, error: '' };
    case 'POSTS_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
