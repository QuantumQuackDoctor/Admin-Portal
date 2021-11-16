import React, { useState } from "react";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";
import { getUserByEmail, getUserById } from "../../../services/UserService";
import PropTypes from "prop-types";

const FindUserWidget = ({ openUser }) => {
  const [errorMessage, setErrorMessage] = useState("");

  let builder = new FormBuilder();
  builder
    .setTitle("Find User")
    .addErrorMessageState(errorMessage)
    .addField("Id", "id")
    .setErrorMessage("must be")
    .addValidator(Validators.Pattern(/[0-9]*/))
    .and()
    .addField("Email", "email")
    .setErrorMessage("must be valid email")
    .addValidator(Validators.Pattern(/(^$|^.*@.*\..*$)/));

  const submitFunction = (data, reset) => {
    if (data.id) {
      getUserById(data.id).then(onSuccess, displayError);
    } else if (data.email) {
      getUserByEmail(data.email).then(onSuccess, displayError);
    } else {
      setErrorMessage("id or email required");
    }
    reset();
  };

  const onSuccess = (res) => {
    openUser(res.data.id);
    setErrorMessage("");
  };

  const displayError = (err) => {
    switch (err.response.status) {
      case 400:
        setErrorMessage("id or email invalid");
        break;
      case 404:
        setErrorMessage("user not found");
        break;
      default:
        setErrorMessage("server error");
    }
  };
  return <>{builder.build(submitFunction)}</>;
};

FindUserWidget.propTypes = {
  openUser: PropTypes.func,
};

export default FindUserWidget;
