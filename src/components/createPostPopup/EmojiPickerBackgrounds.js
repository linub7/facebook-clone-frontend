import Picker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

const EmojiPickerBackgrounds = ({ text, setText, user, type2 }) => {
  const { first_name } = user;
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
  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className={`${!type2 ? 'flex_center' : ''}`}>
        <textarea
          ref={textRef}
          maxLength="100"
          value={text}
          className={`post_input ${type2 ? 'input2' : ''}`}
          placeholder={`What's on your mind, ${first_name}?`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={`${!type2 ? 'post_emojis_wrap' : ''} `}>
        {showPicker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? 'move_picker2' : 'rlmove'
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img src="../../../icons/colorful.png" alt="colorful_icon" />
        )}
        <i
          className={`emoji_icon_large ${type2 ? 'move_left' : ''}`}
          onClick={() => setShowPicker(!showPicker)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackgrounds;
