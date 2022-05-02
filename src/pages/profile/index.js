import axios from 'axios';
import Header from 'components/header';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from 'reducers/profileReducer';
import Cover from './Cover';
import './style.css';

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const navigate = useNavigate();
  const [showCoverMenu, setShowCoverMenu] = useState(false);

  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
  }, [userName]);

  const getProfile = async () => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get-profile/${userName}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      dispatch({ type: 'PROFILE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
      if (error.response.data.message) {
        navigate('/');
      }
    }
  };

  return (
    <div className="profile">
      <Header page={'profile'} />
      <div className="profile_top">
        <div className="profile_container">
          <Cover
            cover={profile?.cover}
            showCoverMenu={showCoverMenu}
            setShowCoverMenu={setShowCoverMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
