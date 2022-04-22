const Story = ({ story }) => {
  const { profile_picture, profile_name, image } = story;
  return (
    <div className="story">
      <img src={image} alt={profile_name} className="story_img" />
      <div className="story_profile_pic">
        <img src={profile_picture} alt={profile_name} />
      </div>
      <div className="story_profile_name">{profile_name}</div>
    </div>
  );
};

export default Story;
