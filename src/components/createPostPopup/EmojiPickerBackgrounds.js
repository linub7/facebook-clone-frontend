import Picker from 'emoji-picker-react';

const EmojiPickerBackgrounds = ({ showPicker, handleEmoji, setShowPicker }) => {
  return (
    <div className="post_emojis_wrap">
      {showPicker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../icons/colorful.png" alt="colorful_icon" />
      <i
        className="emoji_icon_large"
        onClick={() => setShowPicker(!showPicker)}
      ></i>
    </div>
  );
};

export default EmojiPickerBackgrounds;
