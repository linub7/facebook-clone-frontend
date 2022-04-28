import Picker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

const EmojiPickerBackgrounds = ({
  text,
  setText,
  user,
  type2,
  background,
  setBackground,
}) => {
  const { first_name } = user;
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const backgrounds = [
    '../../../images/postBackgrounds/1.jpg',
    '../../../images/postBackgrounds/2.jpg',
    '../../../images/postBackgrounds/3.jpg',
    '../../../images/postBackgrounds/4.jpg',
    '../../../images/postBackgrounds/5.jpg',
    '../../../images/postBackgrounds/6.jpg',
    '../../../images/postBackgrounds/7.jpg',
    '../../../images/postBackgrounds/8.jpg',
    '../../../images/postBackgrounds/9.jpg',
  ];

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newTxt = start + emoji + end;
    setText(newTxt);
    setCursorPosition(start.length + emoji.length);
  };

  const handleBackground = (index) => {
    backgroundRef.current.style.backgroundImage = `url(${backgrounds[index]})`;
    setBackground(backgrounds[index]);
    backgroundRef.current.classList.add('bgHandler');
  };
  const handleResetBackground = () => {
    backgroundRef.current.style.backgroundImage = '';
    setBackground('');
    backgroundRef.current.classList.remove('bgHandler');
  };

  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className={`${!type2 ? 'flex_center' : ''}`} ref={backgroundRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          className={`post_input ${type2 ? 'input2' : ''}`}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 30)
                : 10
            }%`,
          }}
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
          <img
            src="../../../icons/colorful.png"
            alt="colorful_icon"
            onClick={() => setShowBackgrounds(!showBackgrounds)}
          />
        )}
        {!type2 && showBackgrounds && (
          <div className="postBackgrounds">
            <div className="no_bg" onClick={handleResetBackground}></div>
            {backgrounds.map((bg, index) => (
              <img
                src={bg}
                alt="bg"
                key={index}
                onClick={() => handleBackground(index)}
              />
            ))}
          </div>
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
