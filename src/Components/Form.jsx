import React, { useState } from "react";
import validator from "validator";
import FormCreator from "./FormCreator";

const Form = ({ formFields }) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateCheck = (validate, value) => {
    if (!validator[validate](value)) {
      return true;
    }
    return false;
  };

  const validateRequired = (value) => {
    const refinedValue = value.replace(/\s+/g, "");
    if (refinedValue === "" || refinedValue === undefined) {
      return true;
    }
    return false;
  };

  const fieldHandler = (field, value, setError) => {
    let validateValue = null;
    if (typeof value === "string") {
      validateValue = value.replace(/\s+/g, "");
    } else {
      validateValue = value;
    }
    if (field.validate) {
      setError(validateCheck(field.validate, value));
    }
    if (field.required) {
      setErrors(validateRequired(value));
    }
    // if (field.validate && !validator[field.validate](value)) {
    //   setError(true);
    // }

    setState({
      ...state,
      [field.id]: value
    });
    setTouched({
      ...touched,
      [field.id]: true
    });
  };

  const handleBlur = (field, value) => {
    const { id, validate, errorMessage, required } = field;
    // remove whatever error was there previously
    const { [id]: removedError, ...rest } = errors;

    var error = null;
    if (validate && validateCheck(validate, value)) {
      error = validateCheck(validate, value);
      setErrors({ ...errors, [id]: errorMessage });
    }

    // // validate the field if the value has been touched
    // required && value.replace(/\s+/g, "")===""
    setErrors({
      ...rest,
      ...(error && { [id]: touched[id] && error })
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formFields.map((field) => {
      console.log(`state[field.name]`, state[field.name]);
      if (
        field.required &&
        state[field.id] === "" &&
        state[field.id] === undefined
      ) {
        console.log(`${field.id} is required`);
        setErrors({ ...errors, [field.name]: field.errorMessage });
      }
    });
    // validate the form
    const touchValidation = Object.keys(state).reduce(
      (acc, key) => {
        const newTouched = { [key]: true };
        return {
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        touched: { ...touched }
      }
    );
    setTouched(touchValidation.touched);
    console.log(`Errors`, errors);
    if (
      Object.values(errors).length === 0 &&
      Object.values(touchValidation.touched).length === formFields.length && // all fields were touched
      Object.values(touchValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      console.log("submitted");
    } else {
      console.log("Not Submitted");
    }

    // console.log(`state`, state);
    // console.log(`touched`, touched);
    // console.log(`errors`, errors);
  };

  return (
    <>
      <p>Form Main</p>
      <form>
        {formFields.map((field) => {
          return (
            <React.Fragment key={field.id}>
              <FormCreator
                field={field}
                fieldHandler={fieldHandler}
                blurHandler={handleBlur}
              />
            </React.Fragment>
          );
        })}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Form;
