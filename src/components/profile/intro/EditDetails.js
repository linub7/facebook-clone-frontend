import useClickOutside from 'helpers/clickOutside';
import { useRef } from 'react';
import Detail from './Detail';

const EditDetails = ({
  details,
  handleChange,
  updateUserDetails,
  setVisibleEdit,
}) => {
  const editDetailRef = useRef(null);

  useClickOutside(editDetailRef, () => setVisibleEdit(false));
  return (
    <div className="blur">
      <div className="postBox infosBox scrollbar" ref={editDetailRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisibleEdit(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper">
          <div className="details_col">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <Detail
            header="Other name"
            value={details?.otherName}
            img="studies"
            placeholder={'Add Other name'}
            name="otherName"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <div className="details_header">Work</div>
          <Detail
            header="Job"
            value={details?.job}
            img="job"
            placeholder={'Add Job'}
            name="job"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <Detail
            header="Workplace"
            value={details?.workplace}
            img="job"
            placeholder={'Add Workplace'}
            name="workplace"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <div className="details_header">Education</div>
          <Detail
            header="Collage"
            value={details?.collage}
            img="studies"
            placeholder={'Add Collage'}
            name="collage"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <Detail
            header="High school"
            value={details?.highschool}
            img="studies"
            placeholder={'Add High school'}
            name="highschool"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <div className="details_header">Current City</div>
          <Detail
            header="Current City"
            value={details?.currentCity}
            img="home"
            placeholder={'Add Current City'}
            name="currentCity"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <Detail
            header="Hometown"
            value={details?.hometown}
            img="home"
            placeholder={'Add Hometown'}
            name="hometown"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
          <div className="details_header">Relationship</div>
          <Detail
            header="RelationShip"
            value={details?.relationShip}
            img="relationShip"
            placeholder={'Add RelationShip'}
            name="relationShip"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
            rel
          />
          <div className="details_header">Social Network</div>
          <Detail
            header="Instagram"
            value={details?.instagram}
            img="instagram"
            placeholder={'Add Instagram'}
            name="instagram"
            handleChange={handleChange}
            updateUserDetails={updateUserDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
