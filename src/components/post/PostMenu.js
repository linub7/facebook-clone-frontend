import useClickOutside from 'helpers/clickOutside';
import { useRef, useState } from 'react';
import MenuItem from './MenuItem';

const PostMenu = ({
  postOwnerId,
  userId,
  imagesLength,
  setPostMenuVisible,
}) => {
  const [ownPost, setOwnPost] = useState(userId === postOwnerId ? true : false);
  const menu = useRef(null);

  useClickOutside(menu, () => {
    setPostMenuVisible(false);
  });
  return (
    <ul className="post_menu" ref={menu}>
      {ownPost && <MenuItem icon={'pin_icon'} title="Pin Post" />}
      <MenuItem
        icon={'save_icon'}
        title="Save Post"
        subtitle={'Add this to your saved items.'}
      />
      <div className="line"></div>
      {!ownPost && (
        <MenuItem
          icon={'turnOnNotification_icon'}
          title="Turn On Notifications"
        />
      )}
      {ownPost && <MenuItem icon={'edit_icon'} title="Edit Post" />}
      {imagesLength && imagesLength > 0 && (
        <MenuItem icon={'download_icon'} title="Download" />
      )}
      {imagesLength && imagesLength > 0 && (
        <MenuItem icon={'fullscreen_icon'} title="Enter Full Screen" />
      )}
      {ownPost && (
        <MenuItem img="../../../icons/lock.png" title={'Edit Audience'} />
      )}
      {ownPost && (
        <MenuItem
          icon={'turnOffNotifications_icon'}
          title="Turn Off Notifications for this post"
        />
      )}
      {ownPost && (
        <MenuItem icon={'delete_icon'} title="Turn Off Translations" />
      )}
      {ownPost && <MenuItem icon={'date_icon'} title="Edit Date" />}
      {ownPost && (
        <MenuItem icon={'refresh_icon'} title="Refresh Share Attachment" />
      )}
      {ownPost && <MenuItem icon={'archive_icon'} title="Move to Archive" />}
      {ownPost && (
        <MenuItem
          icon={'trash_icon'}
          title="Move to Trash"
          subtitle={'Items in your trash after 30 days'}
        />
      )}
      {!ownPost && <div className="line"></div>}
      {!ownPost && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report Post"
          subtitle={`I'm concerned about this post`}
        />
      )}
    </ul>
  );
};

export default PostMenu;
