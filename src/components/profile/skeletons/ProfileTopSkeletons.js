import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ProfileTopSkeletons = ({ visitor }) => {
  return (
    <>
      <div className="profile_cover">
        <Skeleton height="350px" containerClassName="avatar-skeleton" />
      </div>
      <div
        className="profile_img_wrap"
        style={{
          marginBottom: '-3rem',
          transform: 'translateY(-8px)',
          zIndex: '9999999999',
        }}
      >
        <div className="profile_w_left">
          <Skeleton
            circle
            height="180px"
            width="180px"
            containerClassName="avatar-skeleton"
            style={{
              transform: 'translateY(-3.3rem)',
            }}
          />

          <div className="profile_w_col">
            <div className="profile_name">
              <Skeleton
                height="35px"
                width="200px"
                containerClassName="avatar-skeleton"
              />
            </div>
            <div className="profile_friend_count">
              <Skeleton
                height="20px"
                width="90px"
                containerClassName="avatar-skeleton"
                style={{ marginTop: '5px' }}
              />
            </div>
            <div className="profile_friend_imgs">
              {Array.from(new Array(6), (val, i) => i + 1).map((id, i) => (
                <Skeleton
                  key={i}
                  circle
                  height="32px"
                  width="32px"
                  containerClassName="avatar-skeleton"
                  style={{ transform: `translateX(${-i * 7}px)` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`friendship ${!visitor ? 'fix' : ''}`}>
          <Skeleton
            height="36px"
            width={120}
            containerClassName="avatar-skeleton"
          />
          <div className="flex">
            <Skeleton
              height="36px"
              width={120}
              containerClassName="avatar-skeleton"
            />
            {visitor && (
              <Skeleton
                height="36px"
                width={120}
                containerClassName="avatar-skeleton"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTopSkeletons;
