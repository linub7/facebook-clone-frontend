import React from 'react';

const Bio = ({
  value,
  handleValueChange,
  max,
  setShowBio,
  updateUserDetails,
  placeholder,
  name,
  detail,
  rel,
}) => {
  return (
    <div className="add_bio_wrap">
      {rel ? (
        <select
          className="select_rel"
          name={name}
          value={value}
          onChange={handleValueChange}
        >
          <option value="Single">Single</option>
          <option value="In a relationShip">In a relationShip</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          maxLength={100}
          value={value}
          className="textarea_blue details_input"
          onChange={handleValueChange}
        ></textarea>
      )}
      {!detail && <div className="remaining">{max} Character remaining</div>}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>
          public
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowBio(false)}>
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateUserDetails();
              setShowBio(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
