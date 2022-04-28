import { createPost } from 'functions/post';
import useClickOutside from 'helpers/clickOutside';
import { useRef, useState } from 'react';
import AddToYourPost from './AddToYourPost';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import ImagePreview from './ImagePreview';
import PulseLoader from 'react-spinners/PulseLoader';
import './style.css';
import PostError from './PostError';

const CreatePostPopup = ({ user, setVisible }) => {
  const { picture, first_name, last_name } = user;
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createPostPopupRef = useRef(null);

  useClickOutside(createPostPopupRef, () => {
    setVisible(false);
  });

  const handleSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === 'ok') {
        setText('');
        setBackground('');
        setVisible(false);
      } else {
        setError(response);
      }
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={createPostPopupRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
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
            <EmojiPickerBackgrounds
              text={text}
              background={background}
              user={user}
              setText={setText}
              setBackground={setBackground}
            />
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
        <button className="post_submit" onClick={handleSubmit}>
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
