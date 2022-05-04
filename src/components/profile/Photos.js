import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { photosReducer } from 'reducers/photosReducer';

const Photos = ({ userName, token }) => {
  const [{ error, loading, photos }, dispatch] = useReducer(photosReducer, {
    error: '',
    loading: false,
    photos: {},
  });

  useEffect(() => {
    getPhotos();
  }, [userName]);

  const getPhotos = async () => {
    try {
      dispatch({ type: 'PHOTOS_REQUEST' });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/list-images`,
        {
          path: `${userName}/*`,
          sort: 'desc',
          max: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: 'PHOTOS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'PHOTOS_ERROR', error: error.response.data.message });
    }
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all Photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ''
          : photos.total_count === 1
          ? '1 Photos'
          : `${photos.total_count} Photos`}
      </div>
      <div className="profile_card_grid">
        {photos?.resources &&
          photos.resources.length &&
          photos.resources.slice(0.9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt={img.public_id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
