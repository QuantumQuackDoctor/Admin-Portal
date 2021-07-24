import { nanoid } from "nanoid";
import { useState } from "react";
import { Widget } from "../widget/Widget";

/**
 *
 * @param {Array} fields
 * @returns
 */
const FormWidget = ({ fields, onSubmit }) => {
  //construct state from fields
  let initialState = fields.map((field, index) => {
    return {
      id: index,
      name: field.name,
      currentValue: "",
      validators: field.validators,
      displayError: false,
    };
  });
  const [formState, setFormState] = useState(initialState);
  const createUpdator = (id) => {
    return (e) => {
      setFormState(
        formState.map((field) => {
          if (field.id === id) {
            let hasError = false;
            field.validators.forEach((validator) => {
              if (!validator.call(validator, e.target.value)) hasError = true;
            });
            return {
              ...field,
              currentValue: e.target.value,
              displayError: hasError,
            };
          }
          return field;
        })
      );
    };
  };
  const createSelector = (id) => {
    return formState.find((field) => field.id === id);
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let allFieldsValid = true;
    formState.forEach((field) => {
      field.validators.forEach((validator) => {
        if (!validator.call(validator, field.currentValue))
          allFieldsValid = false;
      });
    });

    if (allFieldsValid) {
      let formValue = {};
      formState.forEach((field) => {
        formValue[field.name] = field.currentValue;
      });
      onSubmit(formValue);
    }
  };
  return (
    <Widget>
      <form onSubmit={formSubmit}>
        {fields.map((field, index) => {
          //index is state id, nanoid is css id
          let elementId = nanoid();
          return (
            <div key={index}>
              <span
                className="FormWidget-error"
                style={{
                  visibility: createSelector(index).displayError
                    ? "visible"
                    : "hidden",
                }}
              >
                {field.errorMessage}
              </span>
              <div>
                <label htmlFor={elementId}>{field.label}</label>
                {field.icon}
                <input
                  id={elementId}
                  value={createSelector(index).value}
                  onChange={createUpdator(index)}
                  placeholder={field.placeholder}
                  type={field.type}
                  name={field.name}
                ></input>
              </div>
            </div>
          );
        })}
        <input type="submit" />
      </form>
    </Widget>
  );
};

export default FormWidget;

/**
 * This builder is just used to show the correct fields and perform very basic validation
 */
export class FormBuilder {
  /**
   *
   * @param {Array} fields array of desired fields
   */
  constructor(fields = []) {
    if (this.validate(fields)) this.fields = fields;
    else this.fields = [];
  }

  /**
   *
   * @param {string} label
   * @param {string} name
   * @param {object} icon
   * @param {string} value
   * @param {string} inputType
   * @param {string} placeholder
   * @param {Array} validators
   * @param {string} errorMessage
   */
  addField(
    label,
    name,
    icon,
    placeholder = "",
    errorMessage = "",
    validators = [],
    value = "",
    inputType = "text"
  ) {
    if (label && name && Array.isArray(validators)) {
      this.fields.push({
        label,
        name,
        icon,
        value,
        inputType,
        placeholder,
        validators,
        errorMessage,
      });
    } else console.log("invalid field");
  }

  /**
   *
   * @param {Function} onSubmit
   * @returns FormWidget
   */
  build(onSubmit) {
    return <FormWidget fields={this.fields} onSubmit={onSubmit} />;
  }

  validate(fields) {
    fields.forEach((field) => {
      if (
        !field.name ||
        !field.label ||
        !field.inputType ||
        !field.value ||
        !field.validators ||
        Array.isArray(field.validators)
      )
        return false;
    });
    return true;
  }
}

export const Validators = {
  Pattern: (regex) => {
    if (!regex instanceof RegExp) regex = new RegExp(regex);
    return (input) => {
      return input.match(regex);
    };
  },
  Email: (input) => {
    //add email validation
    return true;
  },
  Required: (input) => {
    return !!input;
  },
};
