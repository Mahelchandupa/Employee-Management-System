import { useState } from "react";

function useValidation(initialState = {}, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // const fieldValue = type === "checkbox" ? checked : value;

    // console.log("checked", checked, "type", type, 'field Value', fieldValue);

    setValues({
      ...values,
      [name]: value,
    });

    setTouched({
      ...touched,
      [name]: false,
    });

    if (validate) {
      const validationErrors = validate({
        ...values,
        [name]: value,
      });
      setErrors(validationErrors);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // if (validate) {
    //     const validationErrors = validate({ [name]: values[name] });
    //     setErrors({
    //         ...errors,
    //         ...validationErrors,
    //     });
    // }

    // Validate the entire form (all fields) when a field loses focus
    if (validate) {
      const validationErrors = validate({
        ...values,
        [name]: value,
      });
      setErrors(validationErrors);
    }

    //any type of validation
    // if (validate) {
    //   const validationErrors = validate(values);
    //   setErrors({
    //     ...errors,
    //     ...validationErrors,
    //   });
    // }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        callback();
      }
    } else {
      callback();
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

export default useValidation;
