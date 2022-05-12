import axios from 'axios';

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/create-post`,
      { type, background, text, images, user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'ok';
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const reactPost = async (postId, react, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/react-post`,
      { postId, react },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'ok';
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/get-reacts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};
