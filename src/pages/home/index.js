import axios from 'axios';
import CreatePost from 'components/createPost';
import CreatePostPopup from 'components/createPostPopup';
import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import SendVerification from 'components/home/sendVerification';
import Post from 'components/post';
import Stories from 'components/stories';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { postsReducer } from 'reducers/postsReducer';
import './style.css';

const Home = () => {
  const [visible, setVisible] = useState(false);

  const [tmpPost, setTmpPost] = useState(false);

  const [height, setHeight] = useState('');
  const middle = useRef(null);

  const { user } = useSelector((user) => ({ ...user }));

  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  useEffect(() => {
    setHeight(middle.current.clientHeight);

    getAllPosts();
  }, [tmpPost]);

  const getAllPosts = async () => {
    try {
      dispatch({ type: 'POSTS_REQUEST' });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get-posts`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      dispatch({ type: 'POSTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          setTmpPost={setTmpPost}
        />
      )}
      <Header page={'home'} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SendVerification token={user.token} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
