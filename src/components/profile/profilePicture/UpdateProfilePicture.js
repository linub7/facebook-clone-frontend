import { createPost } from 'functions/post';
import { uploadImages } from 'functions/uploadImages';
import { updateProfilePhoto } from 'functions/user';
import getCroppedImg from 'helpers/getCroppedImg';
import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useSelector } from 'react-redux';

const UpdateProfilePicture = ({
  image,
  setImage,
  description,
  setDescription,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState('');
  const sliderRef = useRef(null);

  const { user } = useSelector((state) => ({ ...state }));

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };

  const zoomIn = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          console.log(img);
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      const img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      const res = await uploadImages(formData, path, user.token);
      const updatedPhoto = await updateProfilePhoto(res[0].url, user.token);
      if (updatedPhoto === 'ok') {
        const newPost = await createPost(
          'profilePicture',
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (newPost === 'ok') {
        } else {
          setError(newPost);
        }
      } else {
        setError(updatedPhoto);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
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
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={zoomOut}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            value={zoom}
            step={0.2}
            ref={sliderRef}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={zoomIn}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage('show')}>
          <i className="crop_icon"></i>Crop Photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>Your Profile Picture is Public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link">Cancel</div>
        <button className="blue_btn" onClick={updateProfilePicture}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
