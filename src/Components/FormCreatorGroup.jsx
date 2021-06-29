import React, { useState } from "react";
import styles from "./Form.module.scss";

const FormCreator = ({ field, fieldHandler, blurHandler, dirty }) => {
  const [error, setError] = useState(false);
  switch (field.type) {
    case "text":
      return (
        <>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}:{" "}
          </label>
          <input
            name={field.name}
            className={`${styles.inputfield} ${styles.text}`}
            type="text"
            id={field.id}
            onChange={(e) => fieldHandler(field, e.target.value, setError)}
            onBlur={(e) => blurHandler(field, e.target.value)}
          />
          {error ||
            (dirty && <div className={styles.error}>{field.errorMessage}</div>)}
        </>
      );
    case "select":
      return (
        <>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}:{" "}
          </label>
          <select
            name={field.name}
            id={field.id}
            className={`${styles.inputfield} ${styles.select}`}
            onChange={(e) => fieldHandler(field, e.target.value, setError)}
            onBlur={(e) => blurHandler(field, e.target.value)}
          >
            {field.options.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </>
      );
    case "group":
      return (
        <div>
          {field.fields.map((field) => {
            return (
              <>
                <FormCreator
                  field={field}
                  fieldHandler={fieldHandler}
                  blurHandler={blurHandler}
                />
              </>
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export default FormCreator;
