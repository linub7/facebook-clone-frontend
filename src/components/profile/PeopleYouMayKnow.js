import AddFriendSmallCard from 'components/profile/AddFriendSmallCard';
import { stories } from 'data/home';
import { Dots } from 'svg';

const PeopleYouMayKnow = () => {
  return (
    <div className="ppleumayknow">
      <div className="ppleumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="ppleumayknow_list">
        {stories.map((story, index) => (
          <AddFriendSmallCard item={story} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
