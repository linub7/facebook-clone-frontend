import CreatePost from 'components/createPost';
import CreatePostPopup from 'components/createPostPopup';
import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import SendVerification from 'components/home/sendVerification';
import Stories from 'components/stories';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div className="home">
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {!user.verified && <SendVerification token={user.token} />}
        <CreatePost user={user} setVisible={setVisible} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
