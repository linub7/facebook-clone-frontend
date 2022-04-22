import { Feeling, LiveVideo, Photo } from 'svg';
import './style.css';

const CreatePost = ({ user }) => {
  const { picture, first_name } = user;
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={picture} alt="user" className="" />
        <div className="open_post hover2">
          What's on your mind, {first_name} ?
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
