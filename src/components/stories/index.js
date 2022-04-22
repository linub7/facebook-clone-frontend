import { ArrowRight, Plus } from 'svg';
import { stories } from 'data/home';
import Story from './Story';
import './style.css';

const Stories = () => {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          alt="create"
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="create_story_text">Create Story</div>
      </div>

      {stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
      <div className="white_circle">
        <ArrowRight color={'#65676b'} />
      </div>
    </div>
  );
};

export default Stories;
