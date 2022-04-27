import { useState } from 'react';
import AddToYourPost from './AddToYourPost';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import ImagePreview from './ImagePreview';
import './style.css';

const CreatePostPopup = ({ user }) => {
  const { picture, first_name, last_name } = user;
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={picture} alt={first_name} className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {first_name} {last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="privacy" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPreview ? (
          <>
            <EmojiPickerBackgrounds text={text} setText={setText} user={user} />
          </>
        ) : (
          <ImagePreview
            text={text}
            images={images}
            user={user}
            showPreview={showPreview}
            setText={setText}
            setImages={setImages}
            setShowPreview={setShowPreview}
          />
        )}
        <AddToYourPost setShowPreview={setShowPreview} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
