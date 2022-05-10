import axios from 'axios';
import CreatePost from 'components/createPost';
import CreatePostPopup from 'components/createPostPopup';
import Header from 'components/header';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from 'reducers/profileReducer';
import Cover from 'components/profile/Cover';
import PeopleYouMayKnow from 'components/profile/PeopleYouMayKnow';
import ProfileMenu from 'components/profile/ProfileMenu';
import ProfilePictureInfos from 'components/profile/ProfilePictureInfos';
import './style.css';
import GridPosts from 'components/profile/GridPosts';
import Post from 'components/post';
import Photos from 'components/profile/Photos';
import Friends from 'components/profile/Friends';
import Intro from 'components/profile/intro';

const Profile = ({ visible, setVisible, setTmpPost, tmpPost }) => {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const navigate = useNavigate();
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [forceRenderPage, setForceRenderPage] = useState(false);
  const [othername, setOthername] = useState('');

  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
  }, [userName, forceRenderPage]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);

    return () => {
      setOthername('');
    };
  }, [profile]);

  const visitor = userName === user.username ? false : true;

  const getProfile = async () => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get-profile/${userName}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (data.ok === false) {
        navigate('/');
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/list-images`,
            {
              path: `${userName}/*`,
              sort: 'desc',
              max: 10,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'PROFILE_SUCCESS', payload: data });
      }
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
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          setTmpPost={setTmpPost}
        />
      )}
      <Header page={'profile'} />
      <div className="profile_top">
        <div className="profile_container">
          <Cover
            setForceRenderPage={setForceRenderPage}
            user={user}
            cover={profile?.cover}
            visitor={visitor}
            showCoverMenu={showCoverMenu}
            setShowCoverMenu={setShowCoverMenu}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            username={user.username}
            othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Intro
                  details={profile?.details}
                  visitor={visitor}
                  token={user.token}
                  setForceRenderPage={setForceRenderPage}
                />
                <Photos
                  userName={userName}
                  token={user.token}
                  photos={photos}
                />
                <Friends friends={profile?.friends} />
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post
                        key={post._id}
                        post={post}
                        user={post.user}
                        profile
                      />
                    ))
                  ) : (
                    <div className="no_posts">No Posts Available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
