import { nanoid } from "nanoid";
import { useState } from "react";
import { Widget } from "../widget/Widget";
import "./FormWidget.css";

/**
 *
 * @param {Array} fields
 * @returns
 */
const FormWidget = ({ title, fields, onSubmit }) => {
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
    setFormState(
      formState.map((field) => {
        for (const validator of field.validators) {
          if (!validator.call(validator, field.currentValue)) {
            allFieldsValid = false;
            return {
              ...field,
              displayError: true,
            };
          }
        }
        return field;
      })
    );

    if (allFieldsValid) {
      let formValue = {};
      formState.forEach((field) => {
        formValue[field.name] = field.currentValue;
      });
      onSubmit(formValue);
    }
  };
  return (
    <Widget title={title}>
      <form
        onSubmit={formSubmit}
        data-testid="form"
        className="FormWidget-form"
      >
        {fields.map((field, index) => {
          //index is state id, nanoid is css id
          let elementId = nanoid();
          return (
            <div key={index} className="FormWidget-field-container">
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
              <div className="FormWidget-input">
                <div className="FormWidget-label">
                  {field.icon}
                  <label htmlFor={elementId}>{field.label}</label>
                </div>
                <input
                  id={elementId}
                  data-testid={`form-field-${index}`}
                  value={createSelector(index).value}
                  onChange={createUpdator(index)}
                  placeholder={field.placeholder}
                  type={field.type}
                  name={field.name}
                />
              </div>
            </div>
          );
        })}
        <input
          type="submit"
          data-testid="submit"
          className="FormWidget-submit"
        />
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
  constructor(title = "") {
    this.fields = [];
    this.title = title;
  }

  /**
   *
   * @param {string} label
   * @param {string} name
   * @returns FormFieldBuilder
   */
  addField(label, name) {
    if (!label || !name) throw new Error("Invalid field");
    let newField = new FormFieldBuilder(this, label, name);
    this.fields.push(newField);
    return newField;
  }

  setTitle(title) {
    this.title = title;
  }

  /**
   *
   * @param {Function} onSubmit function called on form submit, function input will be name value pairs for all form fields
   * @returns FormWidget
   */
  build(onSubmit) {
    return (
      <FormWidget
        title={this.title}
        fields={this.fields.map((fieldBuilder) => fieldBuilder.build())}
        onSubmit={onSubmit}
      />
    );
  }
}

export class FormFieldBuilder {
  constructor(callingObject, label, name) {
    this.fieldValues = {
      label,
      name,
      icon: null,
      currentValue: "",
      inputType: "text",
      placeholder: "",
      validators: [],
      errorMessage: "",
    };

    this.callingObject = callingObject;
  }

  build() {
    return this.fieldValues;
  }

  setIcon(icon) {
    this.fieldValues.icon = icon;
    return this;
  }

  setInitialValue(initialValue) {
    this.fieldValues.currentValue = initialValue;
    return this;
  }

  setInputType(inputType) {
    this.fieldValues.inputType = inputType;
    return this;
  }

  setPlaceholder(placeholder) {
    this.fieldValues.placeholder = placeholder;
    return this;
  }

  /**
   *
   * @param {Array} validators array of functions of type (input: text) => true/false
   */
  setValidators(validators) {
    if (Array.isArray(validators)) {
      this.fieldValues.validators = validators;
      return this;
    } else throw new Error("Must be an array");
  }

  addValidator(validator) {
    this.fieldValues.validators.push(validator);
    return this;
  }

  setErrorMessage(message) {
    this.fieldValues.errorMessage = message;
    return this;
  }

  /**
   *
   * @returns {FormBuilder}
   */
  and() {
    return this.callingObject;
  }
}

export const Validators = {
  /**
   * checks against pattern
   * @param {Regex} regex
   * @returns
   */
  Pattern: (regex) => {
    if (!regex instanceof RegExp) regex = new RegExp(regex);
    return (input) => {
      return regex.test(input);
    };
  },
  /**
   * checks for valid email
   * @returns
   */
  Email: (input) => {
    //add email validation
    return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
      input
    );
  },
  /**
   * Accepts anything not blank
   * @returns
   */
  Required: (input) => {
    return !!input;
  },
  /**
   * accepts anything above min
   * @param {number} min
   */
  Min: (min) => {
    if (!Number.isInteger(min))
      throw new Error("Invalid parameter, must be integer");
    return (input) => {
      return !!input && input.length >= min;
    };
  },
  /**
   * Accepts anything below max (including empty or undfined)
   * @param {number} max
   */
  Max: (max) => {
    if (!Number.isInteger(max))
      throw new Error("Invalid parameter, must be integer");
    return (input) => {
      return typeof input === "undefined" || input.length <= max;
    };
  },
};
