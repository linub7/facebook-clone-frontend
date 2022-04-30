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
import './style.css';

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'POSTS_SUCCESS':
      return { ...state, loading: false, posts: payload, error: '' };
    case 'POSTS_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

const Home = () => {
  const [visible, setVisible] = useState(false);

  const [tmpPost, setTmpPost] = useState(false);

  const [height, setHeight] = useState('');
  const middle = useRef(null);

  const { user } = useSelector((user) => ({ ...user }));

  const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: '',
  });

  console.log('posts', posts);

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
      <Header />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SendVerification token={user.token} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
