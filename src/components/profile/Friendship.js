import useClickOutside from 'helpers/clickOutside';
import { useRef, useState } from 'react';

const Friendship = ({ friendShip }) => {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const friendShipRef = useRef(null);
  useClickOutside(friendShipRef, () => {
    setFriendsMenu(false);
    setRespondMenu(false);
  });

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
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/unfollowOutlined.png" alt="edit" />
                  Unfollow
                </div>
              ) : (
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/follow.png" alt="edit" />
                  Follow
                </div>
              )}
              <div className="open_cover_menu_item hover1">
                <i className="unfriend_outlined_icon"></i>
                Unfriends
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendShip?.reqSent &&
        !friendShip?.reqReceived && (
          <button className="blue_btn">
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
        <button className="blue_btn">
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
                <div className="open_cover_menu_item hover1">Confirm</div>
                <div className="open_cover_menu_item hover1">Delete</div>
              </div>
            )}
          </div>
        )
      )}
      {friendShip?.following ? (
        <button className="gray_btn">
          <img src="../../../icons/follow.png" alt="friend" />
          <span>Following</span>
        </button>
      ) : (
        <button className="blue_btn">
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
  );
};

export default Friendship;
