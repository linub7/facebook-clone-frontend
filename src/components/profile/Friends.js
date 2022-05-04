const Friends = ({ friends }) => {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link">See all Friends</div>
      </div>
      <div className="profile_card_count">
        {friends.length === 0
          ? ''
          : friends.length === 1
          ? '1 Photos'
          : `${friends.length} Photos`}
      </div>
      <div className="profile_card_grid">
        {friends &&
          friends
            .slice(0.9)
            .map((friend, index) => (
              <div className="profile_photo_card" key={index}></div>
            ))}
      </div>
    </div>
  );
};

export default Friends;
