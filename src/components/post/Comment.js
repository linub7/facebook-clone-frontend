import { deleteComment } from 'functions/post';
import { useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Comment = ({
  comment,
  ownUser,
  postId,
  token,
  setForcePostRender,
  setTmpPost,
  setForceRenderPage,
  profilePage,
  homePage,
  setCount,
}) => {
  const [hoverMode, setHoverMode] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const ownComment = comment.commentBy._id === user.id ? true : false;

  const handleDelete = async () => {
    if (window.confirm('Are you Sure?')) {
      const commentId = comment._id;
      await deleteComment(postId, commentId, token);
      setForcePostRender((prev) => !prev);
      setCount((prev) => prev - 1);
      homePage && setTmpPost((prev) => !prev);
      profilePage && setForceRenderPage((prev) => !prev);
    }
  };
  return (
    <div className="comment">
      <img
        src={comment?.commentBy.picture}
        alt={comment?.commentBy.username}
        className="comment_img"
      />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            <Link to={`/profile/${comment?.commentBy.username}`}>
              {comment?.commentBy.first_name}
              {comment?.commentBy.last_name}
            </Link>

            {ownComment && (
              <div
                className="delete_action"
                onClick={handleDelete}
                onMouseEnter={() => setHoverMode(true)}
                onMouseLeave={() => setHoverMode(false)}
              >
                {hoverMode ? (
                  <img
                    src={require('assets/trashGif.gif')}
                    alt="trash"
                    className="delete_comment"
                  />
                ) : (
                  <img
                    src={require('assets/trash.png')}
                    alt="trash"
                    className="delete_comment"
                  />
                )}
              </div>
            )}
          </div>
          <div className="comment_text">{comment?.comment}</div>
        </div>
        {comment?.image && (
          <img src={comment?.image} alt="comment" className="comment_image" />
        )}
        <div className="comment_actions">
          <span style={{ cursor: 'pointer' }}>Like</span>
          <span style={{ cursor: 'pointer' }}>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment?.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
