import { useMediaQuery } from 'react-responsive';

const DateOfBirthSelect = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleInputChange,
  dateError,
}) => {
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
      style={{ marginBottom: `${dateError && !view3 ? '90px' : ''}` }}
    >
      <select name="bDay" value={bDay} onChange={handleInputChange}>
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleInputChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleInputChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div className="input_error">
          <div className="error_arrow_bottom"></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
