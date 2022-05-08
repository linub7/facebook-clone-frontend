import React from 'react';

const Bio = ({ bio, handleBioChange, max, setShowBio, updateUserDetails }) => {
  return (
    <div className="add_bio_wrap">
      <textarea
        placeholder="Add Bio"
        name="bio"
        maxLength={100}
        value={bio}
        className="textarea_blue details_input"
        onChange={handleBioChange}
      ></textarea>
      <div className="remaining">{max} Character remaining</div>
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>
          public
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowBio(false)}>
            Cancel
          </button>
          <button className="blue_btn" onClick={updateUserDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
