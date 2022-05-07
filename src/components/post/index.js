import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './style.css';
import { Dots, Public } from 'svg';
import ReactPopup from './ReactPopup';
import { useState } from 'react';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';

const Post = ({ post, user: ownUser, profile }) => {
  const { user, type, createdAt, background, text, images } = post;

  const [visible, setVisible] = useState(false);
  const [postMenuVisible, setPostMenuVisible] = useState(false);
  return (
    <div className="post" style={{ width: `${profile ? '84%' : ''}` }}>
      <div className="post_header">
        <Link to={`/profile/${user.username}`} className="post_header_left">
          <img src={user.picture} alt={user.username} />
          <div className="header_col">
            <div className="post_profile_name">
              {user.first_name} {user.last_name}
              <div className="updated_p">
                {type === 'profilePicture' &&
                  `Update ${
                    user.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {type === 'cover' &&
                  `Update ${
                    user.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30} style={{ marginRight: '5px' }}>
                {createdAt}
              </Moment>

              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setPostMenuVisible(true)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${background})` }}
        >
          {text}
        </div>
      ) : type === null ? (
        <>
          <div className="post_text">{text}</div>
          {images && images.length && (
            <div
              className={
                images.length === 1
                  ? 'grid_1'
                  : images.length === 2
                  ? 'grid_2'
                  : images.length === 3
                  ? 'grid_3'
                  : images.length === 4
                  ? 'grid_4'
                  : images.length >= 5
                  ? 'grid_5'
                  : ''
              }
            >
              {images.slice(0, 5).map((img, index) => (
                <img
                  src={img.url}
                  key={index}
                  alt={img.url}
                  className={`img-${index}`}
                />
              ))}
              {images.length > 5 && (
                <div className="more_pics_shadow">+{images.length - 5}</div>
              )}
            </div>
          )}
        </>
      ) : type === 'profilePicture' ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            {user.cover && <img src={user.cover} alt="cover" />}
          </div>
          <img src={images[0].url} alt="" className="post_updated_picture" />
        </div>
      ) : (
        <div className="post_cover_wrap">post cover wrap</div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="react_counts_imgs"></div>
          <div className="react_counts_num"></div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comment</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactPopup visible={visible} setVisible={setVisible} />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment user={ownUser} />
      </div>
      {postMenuVisible && (
        <PostMenu
          userId={ownUser.id}
          postOwnerId={user._id}
          imagesLength={images?.length}
          setPostMenuVisible={setPostMenuVisible}
        />
      )}
    </div>
  );
};

export default Post;
