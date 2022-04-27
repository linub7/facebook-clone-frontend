import { useEffect, useRef, useState } from 'react';
import AddToYourPost from './AddToYourPost';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import './style.css';

const CreatePostPopup = ({ user }) => {
  const { picture, first_name, last_name } = user;
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newTxt = start + emoji + end;
    setText(newTxt);
    setCursorPosition(start.length + emoji.length);
  };
  console.log(text);
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
        {!showPreview && (
          <>
            <div className="flex_center">
              <textarea
                ref={textRef}
                maxLength="100"
                value={text}
                className="post_input"
                placeholder={`What's on your mind, ${first_name}?`}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <EmojiPickerBackgrounds
              showPicker={showPicker}
              handleEmoji={handleEmoji}
              setShowPicker={setShowPicker}
            />
          </>
        )}
        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
