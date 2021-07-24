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
      value: "",
      validators: field.validators,
      errorMessage: field.errorMessage,
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
              if (!validator(e.target.value)) hasError = true;
            });
            return {
              ...field,
              value: e.target.value,
              displayError: hasError,
            };
          }
          return field;
        })
      );
    };
  };
  const createSelector = (id) => {
    return formState.find((field) => field.id === id).value;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    //TODO check validators

    let formValue = {};
    formState.forEach((field) => {
      formValue[field.name] = field.value;
    });
    onSubmit(formValue);
  };
  return (
    <Widget>
      <form onSubmit={formSubmit}>
        {fields.map((field, index) => {
          let id = nanoid();
          return (
            <div key={index}>
              <label htmlFor={id}>{field.label}</label>
              {field.icon}
              <input
                id={id}
                value={createSelector(index)}
                onChange={createUpdator(index)}
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
              ></input>
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
        !fields.name ||
        !fields.label ||
        !fields.inputType ||
        !fields.value ||
        !fields.validators ||
        Array.isArray(fields.validators)
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
    return input;
  },
  NotBlank: (input) => {
    return input !== "";
  },
};
