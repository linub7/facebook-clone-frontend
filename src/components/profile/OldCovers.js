import useClickOutside from 'helpers/clickOutside';
import { useRef } from 'react';

const OldCovers = ({ photos, setCoverPicture, username, setShowOldCovers }) => {
  const oldCoversRef = useRef(null);

  useClickOutside(oldCoversRef, () => {
    setShowOldCovers(false);
  });
  return (
    <div className="blur">
      <div className="postBox select_coverBox" ref={oldCoversRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShowOldCovers(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select Photo</span>
        </div>
        <div className="select_coverBox_links">
          <div className="select_coverBox_link">Recent Photos</div>
          <div className="select_coverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (photo) => photo.folder === `${username}/cover_pictures`
                )
                .map((img, index) => (
                  <img
                    src={img.secure_url}
                    key={index}
                    alt="old"
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShowOldCovers(false);
                    }}
                  />
                ))}
          </div>
          <h4>Other Pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (photo) => photo.folder !== `${username}/cover_pictures`
                )
                .map((img, index) => (
                  <img
                    src={img.secure_url}
                    key={index}
                    alt="old"
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShowOldCovers(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
