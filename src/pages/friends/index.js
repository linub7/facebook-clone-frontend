import FriendsCard from 'components/friends/FriendsCard';
import Header from 'components/header';
import { cancelRequest, getFriendsPageInfos } from 'functions/user';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { friendsPageReducer } from 'reducers/friendsPageReducer';
import './style.css';
const Friends = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  const navigate = useNavigate();

  const [{ loading, data, error }, dispatch] = useReducer(friendsPageReducer, {
    loading: false,
    data: {},
    error: '',
  });

  useEffect(() => {
    getInfoPage();
  }, [user?.token]);

  const getInfoPage = async () => {
    try {
      dispatch({ type: 'FRIENDS_REQUEST' });
      const result = await getFriendsPageInfos(user?.token);
      dispatch({ type: 'FRIENDS_SUCCESS', payload: result, error: '' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'FRIENDS_ERROR', payload: error });
    }
  };

  return (
    <>
      <Header page={'friends'} />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              to={'/friends'}
              className={`mmenu_item hover3 ${
                type === undefined ? 'active_friends' : ''
              }`}
            >
              <div className="small_circle" style={{ background: '#1876f2' }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Home</span>
              {type !== undefined && (
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              )}
            </Link>
            <div
              className={`mmenu_item hover3 ${
                type === 'requests' ? 'active_friends' : ''
              }`}
              onClick={() => navigate('/friends/requests')}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friends Requests</span>
              {type !== 'requests' && (
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              )}
            </div>
            <div
              className={`mmenu_item hover3 ${
                type === 'sent-requests' ? 'active_friends' : ''
              }`}
              onClick={() => navigate('/friends/sent-requests')}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              {type !== 'sent-requests' && (
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              )}
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div
              className={`mmenu_item hover3 ${
                type === 'all-friends' ? 'active_friends' : ''
              }`}
              onClick={() => navigate('/friends/all-friends')}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              {type !== 'all-friends' && (
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              )}
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthday</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === 'requests') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends Requests</h3>
                {type !== 'requests' && (
                  <Link to={`/friends/requests`} className="see_link">
                    See All
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data?.requests?.slice(0, 3).map((request) => (
                  <FriendsCard
                    user={request}
                    key={request._id}
                    type="request"
                    token={user?.token}
                    getInfoPage={getInfoPage}
                  />
                ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'sent-requests') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {type !== 'sent-requests' && (
                  <Link to={`/friends/sent-requests`} className="see_link">
                    See All
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data?.sentRequests?.slice(0, 3).map((sentRequest) => (
                  <FriendsCard
                    user={sentRequest}
                    key={sentRequest._id}
                    type="sentRequest"
                    token={user?.token}
                    getInfoPage={getInfoPage}
                  />
                ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'all-friends') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {type !== 'all-friends' && (
                  <Link to={`/friends/all-friends`} className="see_link">
                    See All
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data?.friends?.slice(0, 3).map((friend) => (
                  <FriendsCard
                    user={friend}
                    key={friend._id}
                    type="friend"
                    token={user?.token}
                    getInfoPage={getInfoPage}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
