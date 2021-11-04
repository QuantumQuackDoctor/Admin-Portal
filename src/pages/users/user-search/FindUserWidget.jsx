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

  const submitFunction = async (data) => {
    try {
      if (data.id) {
        await getUserById(data.id);
        openUser(data.id);
        setErrorMessage("");
      } else if (data.email) {
        let res = await getUserByEmail(data.email);
        openUser(res.data.id);
        setErrorMessage("");
      } else {
        setErrorMessage("id or email required");
      }
    } catch (err) {
      switch (err.status) {
        case 400:
          setErrorMessage("id or email invalid");
          break;
        case 404:
          setErrorMessage("user not found");
          break;
        default:
          setErrorMessage("server error");
      }
    }
  };
  return <>{builder.build(submitFunction)}</>;
};

FindUserWidget.propTypes = {
  openUser: PropTypes.func,
};

export default FindUserWidget;
