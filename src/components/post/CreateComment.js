import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { sendComment } from 'functions/post';
import dataURItoBlob from 'helpers/dataURItoBlog';
import { uploadImages } from 'functions/uploadImages';
import PuffLoader from 'react-spinners/PuffLoader';
import { useSelector } from 'react-redux';

const CreateComment = ({
  user,
  postId,
  setForcePostRender,
  setTmpPost,
  setForceRenderPage,
  homePage,
  profilePage,
  setCount,
}) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [comment, setComment] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textRef = useRef(null);
  const imageInput = useRef(null);

  const {
    user: { token },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const newTxt = start + emoji + end;
    setComment(newTxt);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError('Only image type should be select');
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setError('Maximum size is 2Mb');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleSendComment = async () => {
    if (commentImage !== '') {
      setLoading(true);
      const img = dataURItoBlob(commentImage);
      const path = `${user.username}/post_images/${postId}/comments`;
      let formData = new FormData();
      formData.append('path', path);
      formData.append('file', img);

      const imgComment = await uploadImages(formData, path, token);
      const image = imgComment[0].url;
      const res = await sendComment(postId, comment, image, token);
      setForcePostRender((prev) => !prev);
      setCount((prev) => prev + 1);
      homePage && setTmpPost((prev) => !prev);
      profilePage && setForceRenderPage((prev) => !prev);
      setComment('');
      setCommentImage('');
      console.log(res);
      setLoading(false);
    } else {
      const res = await sendComment(postId, comment, '', token);
      setForcePostRender((prev) => !prev);
      setCount((prev) => prev + 1);
      homePage && setTmpPost((prev) => !prev);
      profilePage && setForceRenderPage((prev) => !prev);
      setComment('');
      setLoading(false);
    }
  };

  const handleSendCommentByEnter = async (e) => {
    if (e.key === 'Enter') {
      await handleSendComment();
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt={user?.username} />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imageInput}
            accept="image/*"
            onChange={handleImage}
          />
          {error && (
            <div className="post_error comment_error">
              <div className="post_error_error">{error}</div>
              <button
                className="blue_btn"
                onClick={() => {
                  imageInput.current.click();
                  setError('');
                }}
              >
                Try again
              </button>
            </div>
          )}
          <input
            placeholder="Write a comment..."
            type="text"
            ref={textRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            onKeyUp={handleSendCommentByEnter}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker(!picker)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imageInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2" onClick={() => {}}>
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2" onClick={() => {}}>
            <i className="sticker_icon"></i>
          </div>
          {loading ? (
            <div className="comment_circle">
              <PuffLoader size={20} color="#1876f2" loading={loading} />
            </div>
          ) : (
            <button
              style={{ borderColor: 'transparent' }}
              disabled={loading}
              className="comment_circle_icon hover2"
              onClick={handleSendComment}
            >
              <i className="send_icon"></i>
            </button>
          )}
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="commentImage" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage('')}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
