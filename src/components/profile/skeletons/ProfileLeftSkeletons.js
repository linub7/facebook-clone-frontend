import 'react-loading-skeleton/dist/skeleton.css';
import { HashLoader } from 'react-spinners';

const ProfileLeftSkeletons = () => {
  return (
    <>
      <div className="profile_card">
        <div className="profile_card_header">Intro</div>
        <div className="skeleton-loader">
          <HashLoader color="#1876f2" />
        </div>
      </div>
      <div className="profile_card">
        <div className="profile_card_header">
          Photos
          <div className="profile_header_link">See all Photos</div>
        </div>
        <div className="skeleton-loader">
          <HashLoader color="#1876f2" />
        </div>
      </div>
      <div className="profile_card">
        <div className="profile_card_header">
          Friends
          <div className="profile_header_link">See all Friends</div>
        </div>
        <div className="skeleton-loader">
          <HashLoader color="#1876f2" />
        </div>
      </div>
    </>
  );
};

export default ProfileLeftSkeletons;
