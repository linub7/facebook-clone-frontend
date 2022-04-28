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
    const { data } = await axios.post(
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
