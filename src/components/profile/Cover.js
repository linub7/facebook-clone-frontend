import useClickOutside from 'helpers/clickOutside';
import { useRef } from 'react';

const Cover = ({ cover, setShowCoverMenu, showCoverMenu, visitor }) => {
  const coverMenuRef = useRef(null);

  useClickOutside(coverMenuRef, () => setShowCoverMenu(false));
  return (
    <div className="profile_cover">
      {cover && <img src={cover} alt="cover" className="cover" />}
      <div className="update_cover_wrapper">
        {!visitor && (
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu(true)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
        )}
        {showCoverMenu && (
          <div className="open_cover_menu" ref={coverMenuRef}>
            <div className="open_cover_menu_item hover1">
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div className="open_cover_menu_item hover1">
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;
