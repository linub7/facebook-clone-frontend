import { useRef, useState } from 'react';
import Friendship from './Friendship';
import ProfilePicture from './profilePicture';

const ProfilePictureInfos = ({
  profile,
  visitor,
  photos,
  username,
  othername,
  setForceRenderPage,
}) => {
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);
  return (
    <div className="profile_img_wrap">
      {show && (
        <ProfilePicture
          photos={photos}
          username={username}
          profileRef={profileRef}
          setShow={setShow}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={profileRef}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            {/* <div className="othername">{othername}</div> */}
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        <Friendship
          initialFriendShip={profile?.friendShip}
          profileId={profile._id}
          setForceRenderPage={setForceRenderPage}
        />
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="plus" className="invert" />
            <span>Add to story</span>
          </div>
          <div
            className="blue_btn"
            style={{ background: '#eee', color: '#111', fontWeight: 500 }}
          >
            <i className="edit_icon"></i>
            <span>Edit Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;
