import { nanoid } from "nanoid";
import { useState } from "react";
import { Widget } from "../widget/Widget";
import "./FormWidget.css";

/**
 *
 * @param {Array} fields
 * @returns
 */
const FormWidget = ({
  title,
  fields,
  onSubmit,
  errorMessage,
  submitText,
  children,
  showReset,
}) => {
  //construct state from fields
  let initialState = fields.map((field, index) => {
    return {
      id: index,
      name: field.name,
      currentValue: field.currentValue,
      validators: field.validators,
      displayError: false,
    };
  });
  const [formState, setFormState] = useState(initialState);

  const createUpdator = (id, inputType) => {
    if (!inputType) inputType = "text";
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
              currentValue:
                inputType === "checkbox" ? e.target.checked : e.target.value,
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

    if (allFieldsValid && onSubmit) {
      let formValue = {};
      formState.forEach((field) => {
        formValue[field.name] = field.currentValue;
      });
      onSubmit.call(onSubmit, formValue);
    }
  };

  let rows = [
    {
      desiredRow: 0,
      fields: [],
    },
  ];

  fields.forEach((field, index) => {
    field.id = index;
    let row = rows.find((row) => row.desiredRow === field.desiredRow);
    if (row) row.fields.push(field);
    else rows.push({ desiredRow: field.desiredRow, fields: [field] });
  });

  const resetFields = () => {
    setFormState(
      formState.map((fieldState) => ({
        ...fieldState,
        displayError: false,
        currentValue: fields.find((field) => field.id === fieldState.id)
          .currentValue,
      }))
    );
  };

  return (
    <Widget title={title}>
      <span className="FormWidget-error">{errorMessage}</span>
      <form
        onSubmit={formSubmit}
        data-testid="form"
        className="FormWidget-form"
      >
        <div className="FormWidget-row-container">
          {rows.map((row) => {
            return (
              <div
                key={row.desiredRow}
                className="FormWidget-row"
                style={{ order: row.desiredRow }}
              >
                {row.fields.map((field, index) => {
                  //index is state id, nanoid is css id
                  let elementId = `Form-Widget-${field.id}`;
                  return (
                    <div key={field.id} className="FormWidget-field-container">
                      <div
                        className="FormWidget-error"
                        style={{
                          visibility: createSelector(field.id).displayError
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        {field.errorMessage || <br />}
                      </div>
                      <div className="FormWidget-input">
                        <div className="FormWidget-label">
                          {field.icon}
                          <label htmlFor={elementId}>{field.label}</label>
                        </div>
                        <input
                          id={elementId}
                          data-testid={`form-field-${index}`}
                          value={createSelector(field.id).currentValue}
                          onChange={createUpdator(field.id, field.inputType)}
                          placeholder={field.placeholder}
                          type={field.inputType}
                          name={field.name}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {[children].flat()}
        <div className="FormWidget-submit-container">
          <input
            type="submit"
            value={submitText}
            data-testid="submit"
            className="FormWidget-submit"
          />
          {showReset ? (
            <input
              type="reset"
              className="FormWidget-submit FormWidget-reset"
              data-testid="reset"
              onClick={resetFields}
            />
          ) : (
            ""
          )}
        </div>
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
    this.submitText = "Submit";
    this.childComponent = null;
    this.useRows = false;
    this.showReset = false;
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
    return this;
  }

  setShowReset(boolean) {
    this.showReset = boolean;
    return this;
  }

  /**
   *
   * @param {*} bool you know what a bool is
   */
  setUseRows(bool) {
    this.useRows = bool;
    return this;
  }

  /**
   * pass in state, to stop showing a message set to empty string
   * @param {string} message
   */
  addErrorMessageState(message) {
    this.errorMessage = message;
    return this;
  }

  setChildComponent(component) {
    this.childComponent = component;
    return this;
  }

  /**
   *
   * @param {string} text
   */
  setSubmitText(text) {
    this.submitText = text;
    return this;
  }

  /**
   *
   * @param {Function} onSubmit function called on form submit, function input will be name value pairs for all form fields
   * @returns FormWidget
   */
  build(onSubmit) {
    //map field rows
    if (this.useRows) {
      let startRow = 0;
      this.fields.forEach((field) => {
        if (field.getDesiredRow() === 0) field.setDesiredRow(startRow);
        else startRow = field.getDesiredRow();
      });
    } else {
      for (let i = 0; i < this.fields.length; i++) {
        this.fields[i].setDesiredRow(i);
      }
    }
    return (
      <FormWidget
        title={this.title}
        useRows={this.useRows}
        fields={this.fields.map((fieldBuilder) => fieldBuilder.build())}
        onSubmit={onSubmit}
        errorMessage={this.errorMessage}
        submitText={this.submitText}
        children={this.childComponent}
        showReset={this.showReset}
      />
    );
  }
}

/**
 * 0 0 0
 * 1 1 1
 * 2 2 2
 */

export class FormFieldBuilder {
  constructor(callingObject, label, name) {
    this.fieldValues = {
      label,
      name,
      icon: null,
      currentValue: "",
      inputType: "text",
      desiredRow: 0, //default
      placeholder: "",
      validators: [],
      errorMessage: "",
    };

    this.callingObject = callingObject;
  }

  build() {
    return this.fieldValues;
  }

  setDesiredRow(rowNumber) {
    this.fieldValues.desiredRow = rowNumber;
    return this;
  }

  getDesiredRow() {
    return this.fieldValues.desiredRow;
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
  Age: (age) => {
    return (input) => {
      let dateDiff = Date.now() - Date.parse(input);
      let ageDate = new Date(dateDiff);
      return ageDate.getUTCFullYear() - 1970 >= age;
    };
  },
};
