import { useRef, useState } from 'react';
import './style.css';
import UpdateProfilePicture from './UpdateProfilePicture';

const ProfilePicture = ({ setShow, profileRef, photos, username }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const inputRef = useRef(null);

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError('Only image type should be select');
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setError('Maximum size is 2Mb');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImage}
        accept="image/*"
      />
      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update Profile Picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Update Photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add Frame
            </button>
          </div>
        </div>
        {error && (
          <div className="post_error comment_error">
            <div className="post_error_error">{error}</div>
            <button
              className="blue_btn"
              onClick={() => {
                inputRef.current.click();
                setError('');
              }}
            >
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (photo) => photo.folder === `${username}/profile_pictures`
                )
                .map((img, index) => (
                  <img
                    src={img.secure_url}
                    key={index}
                    alt="old"
                    onClick={() => setImage(img.secure_url)}
                  />
                ))}
          </div>
          <h4>Other Pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (photo) => photo.folder !== `${username}/profile_pictures`
                )
                .map((img, index) => (
                  <img
                    src={img.secure_url}
                    key={index}
                    alt="old"
                    onClick={() => setImage(img.secure_url)}
                  />
                ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          image={image}
          setImage={setImage}
          description={description}
          setDescription={setDescription}
          setShow={setShow}
          profileRef={profileRef}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
