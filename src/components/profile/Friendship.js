import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  followUser,
  unFollowUser,
  unFriend,
} from 'functions/user';
import useClickOutside from 'helpers/clickOutside';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Friendship = ({ initialFriendShip, profileId, setForceRenderPage }) => {
  const [friendShip, setFriendShip] = useState(initialFriendShip);

  console.log(initialFriendShip);

  useEffect(() => {
    setFriendShip(initialFriendShip);
  }, [initialFriendShip]);

  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const {
    user: { token },
  } = useSelector((state) => ({ ...state }));

  const friendShipRef = useRef(null);
  useClickOutside(friendShipRef, () => {
    setFriendsMenu(false);
    setRespondMenu(false);
  });

  const handleAddFriend = async () => {
    try {
      await addFriend(profileId, token);
      setFriendShip({ ...friendShip, reqSent: true, following: true });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await cancelRequest(profileId, token);
      setFriendShip({ ...friendShip, reqSent: false, following: false });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      await followUser(profileId, token);
      setFriendShip({ ...friendShip, following: true });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      await unFollowUser(profileId, token);
      setFriendShip({ ...friendShip, following: false });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await acceptRequest(profileId, token);
      setFriendShip({
        ...friendShip,
        friends: true,
        following: true,
        reqSent: false,
        reqReceived: false,
      });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      await deleteRequest(profileId, token);
      setFriendShip({
        ...friendShip,
        friends: false,
        reqReceived: false,
        reqSent: false,
      });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFriend = async () => {
    try {
      await unFriend(profileId, token);
      setFriendShip({
        ...friendShip,
        friends: false,
        reqReceived: false,
        reqSent: false,
      });
      setForceRenderPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="friendship">
      {friendShip?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="friend" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={friendShipRef}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="favorite" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="edit" />
                Edit Friend List
              </div>
              {friendShip?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleUnFollow}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="edit" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleFollow}
                >
                  <img src="../../../icons/follow.png" alt="edit" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={handleUnFriend}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendShip?.reqSent &&
        !friendShip?.reqReceived && (
          <button className="blue_btn" onClick={handleAddFriend}>
            <img
              src="../../../icons/addFriend.png"
              alt="addFriend"
              className="invert"
            />
            <span>Add Friends</span>
          </button>
        )
      )}
      {friendShip?.reqSent ? (
        <button className="blue_btn" onClick={handleCancelRequest}>
          <img
            src="../../../icons/cancelRequest.png"
            alt="cancel_req"
            className="invert"
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendShip?.reqReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="friend" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={friendShipRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleAcceptRequest}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleDeleteRequest}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendShip?.following ? (
          <button className="gray_btn" onClick={handleUnFollow}>
            <img src="../../../icons/follow.png" alt="friend" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={handleFollow}>
            <img
              src="../../../icons/follow.png"
              alt="follow"
              className="invert"
            />
            <span>Follow</span>
          </button>
        )}
        <button className={`${friendShip?.friends ? 'blue_btn' : 'gray_btn'}`}>
          <img
            src="../../../icons/message.png"
            alt="message"
            className={`${friendShip?.friends ? 'invert' : ''}`}
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Friendship;
