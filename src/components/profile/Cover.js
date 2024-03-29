import { createPost } from 'functions/post';
import { uploadImages } from 'functions/uploadImages';
import { updateCoverPhoto } from 'functions/user';
import useClickOutside from 'helpers/clickOutside';
import getCroppedImg from 'helpers/getCroppedImg';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { PulseLoader } from 'react-spinners';
import OldCovers from './OldCovers';

const Cover = ({
  photos,
  cover,
  setShowCoverMenu,
  showCoverMenu,
  visitor,
  user,
  setForceRenderPage,
}) => {
  const [coverPicture, setCoverPicture] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOldCovers, setShowOldCovers] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [width, setWidth] = useState();

  const coverMenuRef = useRef(null);
  const coverInputRef = useRef(null);
  const coverRef = useRef(null);
  const coverPhotoRef = useRef(null);

  useClickOutside(coverMenuRef, () => setShowCoverMenu(false));

  const handleCoverImage = (e) => {
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
      setCoverPicture(event.target.result);
    };
    setShowCoverMenu(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
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

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      const img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      const res = await uploadImages(formData, path, user.token);
      const updatedPhoto = await updateCoverPhoto(res[0].url, user.token);
      if (updatedPhoto === 'ok') {
        const newPost = await createPost(
          'cover',
          null,
          null,
          res,
          user.id,
          user.token
        );

        if (newPost === 'ok') {
          setLoading(false);
          setCoverPicture('');
          coverPhotoRef.current.src = `${res[0].url}`;
          setForceRenderPage((prev) => !prev);
        } else {
          setError(newPost);
          setLoading(false);
        }
      } else {
        setError(updatedPhoto);
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your Cover Photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture('')}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={updateCoverPicture}>
              {loading ? <PulseLoader color="#fff" size={5} /> : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        hidden
        ref={coverInputRef}
        accept="image/*"
        onChange={handleCoverImage}
      />
      {error && (
        <div className="post_error comment_error">
          <div className="post_error_error">{error}</div>
          <button
            className="blue_btn"
            onClick={() => {
              coverInputRef.current.click();
              setError('');
            }}
          >
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} alt="cover" className="cover" ref={coverPhotoRef} />
      )}
      <div className="update_cover_wrapper">
        {!visitor && (
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu(true)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
        )}
        {showCoverMenu && (
          <div className="open_cover_menu" ref={coverMenuRef}>
            <div
              className="open_cover_menu_item hover1"
              onClick={() => setShowOldCovers(true)}
            >
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div
              className="open_cover_menu_item hover1"
              onClick={() => coverInputRef.current.click()}
            >
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
      {showOldCovers && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          username={user.username}
          setShowOldCovers={setShowOldCovers}
        />
      )}
    </div>
  );
};

export default Cover;
