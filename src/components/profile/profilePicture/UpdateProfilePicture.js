const UpdateProfilePicture = ({ setImage, description, setDescription }) => {
  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage(false)}>
          <i className="exit_icon"></i>
        </div>
        <span>Update Profile Picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          className="textarea_blue details_input"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="update_center">
        <div className="cropper"></div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
