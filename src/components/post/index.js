import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './style.css';
import { Dots, Public } from 'svg';
import ReactPopup from './ReactPopup';
import { useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import { getReacts, reactPost } from 'functions/post';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const Post = ({
  post,
  user: ownUser,
  profile,
  setTmpPost,
  setForceRenderPage,
  homePage,
  profilePage,
}) => {
  const { user, type, createdAt, background, text, images } = post;
  const {
    user: { token },
  } = useSelector((state) => ({ ...state }));

  const [visible, setVisible] = useState(false);
  const [postMenuVisible, setPostMenuVisible] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [forcePostRender, setForcePostRender] = useState(false);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getPostReact();
  }, [post, forcePostRender]);

  useEffect(() => {
    setComments(post?.comments);

    return () => {
      setComments([]);
    };
  }, [post]);

  const handleReact = async (react) => {
    try {
      await reactPost(post?._id, react, token);
      setForcePostRender((prev) => !prev);
      let index = reacts.findIndex((item) => item.react === check);
      if (index !== -1) {
        // exists
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostReact = async () => {
    try {
      const res = await getReacts(post._id, token);
      setReacts(res.reacts);
      setCheck(res.check);
      setTotal(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const showLess = () => {
    setCount(1);
  };

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
            {user.cover && (
              <img
                src={user.cover}
                alt="cover"
                className="post_updated_bg_cover"
              />
            )}
          </div>
          <img src={images[0].url} alt="" className="post_updated_picture" />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={images[0].url} alt="cover" />
        </div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .slice(0, 3)
                .map(
                  (react, index) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt={react.react}
                        key={index}
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comment</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactPopup
          visible={visible}
          setVisible={setVisible}
          handleReact={handleReact}
        />
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
          onClick={() => handleReact(check ? check : 'like')}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt={`${check}`}
              className="small_react"
              style={{ width: '20px' }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
          ${
            check === 'like'
              ? '#4267b2'
              : check === 'love'
              ? '#f63459'
              : check === 'haha'
              ? '#f7b125'
              : check === 'wow'
              ? '#f7b125'
              : check === 'sad'
              ? '#f7b125'
              : check === 'angry'
              ? '#e4605a'
              : ''
          }
          `,
            }}
          >
            {check ? check : 'Like'}
          </span>
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
        <CreateComment
          user={ownUser}
          postId={post._id}
          setForcePostRender={setForcePostRender}
          setTmpPost={setTmpPost}
          setForceRenderPage={setForceRenderPage}
          profilePage={profilePage}
          homePage={homePage}
          setCount={setCount}
        />
        {comments
          ?.sort((a, b) => {
            return new Date(b.commentAt) - new Date(a.commentAt);
          })
          .slice(0, count)
          .map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              ownUser={ownUser}
              postId={post._id}
              token={token}
              setForcePostRender={setForcePostRender}
              setTmpPost={setTmpPost}
              setForceRenderPage={setForceRenderPage}
              profilePage={profilePage}
              homePage={homePage}
              setCount={setCount}
            />
          ))}
        {count < comments?.length && (
          <div className="view_comments" onClick={showMore}>
            View more comments
          </div>
        )}
        {count !== 1 && count >= comments?.length && (
          <div className="view_comments" onClick={showLess}>
            View less comments
          </div>
        )}
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
