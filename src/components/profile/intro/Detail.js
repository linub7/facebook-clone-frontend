import { useState } from 'react';
import Bio from './Bio';

const Detail = ({ header, img, value, placeholder, name }) => {
  const [showEdit, setShowEdit] = useState(true);
  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex">
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
      {showEdit && <Bio placeholder={placeholder} name={name} />}
    </div>
  );
};

export default Detail;
