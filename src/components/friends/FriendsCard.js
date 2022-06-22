import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  unFriend,
} from 'functions/user';
import { Link } from 'react-router-dom';

const FriendsCard = ({ user, type, token, getInfoPage }) => {
  const handleCancelRequest = async (id) => {
    try {
      const data = await cancelRequest(id, token);
      if (data === 'ok') {
        getInfoPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptRequest = async (id) => {
    try {
      const data = await acceptRequest(id, token);
      if (data === 'ok') {
        getInfoPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const data = await deleteRequest(id, token);
      if (data === 'ok') {
        getInfoPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFriend = async (id) => {
    try {
      const data = await unFriend(id, token);
      if (data === 'ok') {
        getInfoPage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="req_card">
      <Link to={`/profile/${user?.username}`}>
        <img src={user?.picture} alt={user?.username} />
      </Link>
      <div className="req_name">
        {user?.first_name} {user?.last_name}
      </div>
      {type === 'sentRequest' ? (
        <button
          className="blue_btn"
          onClick={() => handleCancelRequest(user._id)}
        >
          Cancel Request
        </button>
      ) : type === 'request' ? (
        <>
          <button
            className="blue_btn"
            onClick={() => handleAcceptRequest(user._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            onClick={() => handleDeleteRequest(user._id)}
          >
            Delete
          </button>
        </>
      ) : (
        <button className="blue_btn" onClick={() => handleUnFriend(user._id)}>
          UnFriend
        </button>
      )}
    </div>
  );
};

export default FriendsCard;
