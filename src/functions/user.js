import axios from 'axios';

export const updateProfilePhoto = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/update-profile-picture`,
      { url },
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
