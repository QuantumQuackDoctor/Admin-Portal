import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { requestResetPassword } from "../../../services/AuthService";
import PropTypes from "prop-types";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";
import { Widget } from "../../../shared/widget/Widget";

const ForgotPassword = ({ authenticated }) => {
  const [submitted, setSubmitted] = useState(false);

  const builder = new FormBuilder("Forgot Password?");
  const [errorMessage, setErrorMessage] = useState("");
  builder
    .addErrorMessageState(errorMessage)

    .addField("Email", "email")
    .addValidator(Validators.Email)
    .setIcon(<FaEnvelope />);

  const submitFunc = async (formData) => {
    try {
      await requestResetPassword(formData.email);
      setSubmitted(true);
    } catch (err) {
      switch (err.response.status) {
        case 404:
          setErrorMessage("Email not valid");
          break;
        default:
          setErrorMessage("Server error");
      }
    }
  };

  return (
    <>
      {authenticated ? (
        ""
      ) : (
        <div>
          {submitted ? (
            <Widget title="Reset Password">
              <span style={{ color: "var(--color-main)" }}>
                Password reset requested,
                <br /> check your email for further steps
              </span>
            </Widget>
          ) : (
            builder.build(submitFunc)
          )}
        </div>
      )}
    </>
  );
};

ForgotPassword.propTypes = {
  authenticated: PropTypes.bool,
};

export default ForgotPassword;
