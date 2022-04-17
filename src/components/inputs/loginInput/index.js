import { ErrorMessage, useField } from 'formik';
import './style.css';
const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: `translateY(2px)` }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_top"></div>
        </div>
      )}

      <input
        className={
          meta.touched && meta.error ? 'input_error_border' : undefined
        }
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && '63%'}` }}></i>
      )}
      {meta.touched && meta.error && bottom && (
        <div className="input_error">
          <ErrorMessage name={field.name} />
          <div className="error_arrow_bottom"></div>
        </div>
      )}
    </div>
  );
};

export default LoginInput;
