import { useState } from 'react';
import Bio from './Bio';

const Detail = ({
  header,
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateUserDetails,
  rel,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div>
      <div className="add_details_flex" onClick={() => setShowEdit(true)}>
        {value ? (
          <div className="info_profile no_underline">
            <img src={`../../../icons/${img}.png`} alt={header} />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            Add {header}
          </>
        )}
      </div>
      {showEdit && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleValueChange={handleChange}
          updateUserDetails={updateUserDetails}
          detail
          setShowBio={setShowEdit}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          rel={rel}
        />
      )}
    </div>
  );
};

export default Detail;
