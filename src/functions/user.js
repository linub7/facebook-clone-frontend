import axios from 'axios';

export const updateProfilePhoto = async (url, token) => {
  try {
    await axios.put(
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

export const updateCoverPhoto = async (url, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/update-cover-picture`,
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

export const updateDetails = async (infos, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/update-details`,
      { infos },
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

export const addFriend = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/add-friend/${id}`,
      {},
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

export const cancelRequest = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/cancel-request/${id}`,
      {},
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

export const followUser = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {},
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

export const unFollowUser = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
      {},
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

export const acceptRequest = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/accept-request/${id}`,
      {},
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
export const deleteRequest = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/delete-request/${id}`,
      {},
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

export const unFriend = async (id, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/un-friend/${id}`,
      {},
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

export const search = async (searchTerm, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.result;
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const addToSearchHistory = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
      { searchUser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.ok;
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/get-search-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.result;
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const deleteHistory = async (searchId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/delete-search-history`,
      { searchId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.ok;
  } catch (error) {
    return 'OOPS! an error occurred';
  }
};

export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/get-friends-page-infos`,
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
