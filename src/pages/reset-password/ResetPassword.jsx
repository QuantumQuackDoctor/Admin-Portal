import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { updatePassword } from "../../services/AuthService";
import { Validators } from "../../shared/form-widget/FormWidget";

const ResetPassword = () => {
  const { token } = useParams();
  const [showSubmit, setShowSubmit] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    touched: false,
  });
  const [parity, setParity] = useState({
    value: "",
    valid: false,
    touched: false,
  });

  const history = useHistory();

  const validatePassword = Validators.OrNull(Validators.Password);

  const passwordUpdator = (event) => {
    setPassword({
      value: event.target.value,
      valid: validatePassword(event.target.value),
      touched: true,
    });
  };

  const parityUpdator = (event) => {
    setParity({
      value: event.target.value,
      valid: event.target.value === password.value,
      touched: true,
    });
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    setShowSubmit(false);
    if (password.valid && parity.valid) {
      try {
        await updatePassword(token, password.value);
        setResetSuccess(true);
        setErrorMessage("");
        history.push("/account");
      } catch (err) {
        setResetSuccess(false);
        setShowSubmit(true);
        switch (err.response.status) {
          case 404:
            setErrorMessage("Password reset not valid");
            break;
          case 410:
            setErrorMessage("Password reset expired");
            break;
          default:
            setErrorMessage("Server error");
        }
      }
    }
  };
  return (
    <>
      {!resetSuccess ? (
        <form
          onSubmit={submitFunc}
          className="d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100"
        >
          <h1 style={{ color: "var(--color-main)" }}>Reset Password</h1>
          <h4 style={{ color: "red" }}>{errorMessage}</h4>
          <InputGroup className="w-50 has-validation">
            <label className="w-100" style={{ color: "var(--color-main)" }}>
              New Password
              <input
                type="password"
                id="password"
                className="form-control"
                value={password.value}
                onChange={passwordUpdator}
              />
            </label>
            {!password.valid && password.touched ? (
              <div style={{ color: "red" }}>
                *password must have 1 Uppercase, Number, and special character
              </div>
            ) : (
              ""
            )}
          </InputGroup>
          <InputGroup className="w-50 has-validation">
            <label className="w-100" style={{ color: "var(--color-main)" }}>
              Confirm password
              <input
                type="password"
                id="parity"
                className="form-control"
                value={parity.value}
                onChange={parityUpdator}
              />
            </label>
            {!parity.valid && parity.touched ? (
              <div style={{ color: "red" }}>*Passwords must match</div>
            ) : (
              ""
            )}
          </InputGroup>
          {showSubmit ? <input type="submit" className="button" /> : ""}
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default ResetPassword;
