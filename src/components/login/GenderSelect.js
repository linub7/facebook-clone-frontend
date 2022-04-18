import { useMediaQuery } from 'react-responsive';

const GenderSelect = ({ handleInputChange, genderError }) => {
  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 850px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && !view3 ? '40px' : ''}` }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleInputChange}
        />
      </label>
      {genderError && (
        <div className="input_error">
          <div className="error_arrow_bottom"></div>
          {genderError}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;
