import React from "react";
import PropTypes from "prop-types";
import { FormBuilder } from "../../../shared/form-widget/FormWidget";
import { FaHashtag } from "react-icons/fa";
import { useState } from "react";
import { getOrder } from "../../../services/OrderService";

const FindOrderForm = ({ openOrder }) => {
  let builder = new FormBuilder("FindOrder");
  const [errorMessage, setErrorMessage] = useState("");
  builder
    .addErrorMessageState(errorMessage)

    .addField("Id", "id")
    .setPlaceholder("Order Id")
    .setErrorMessage("*Id required")
    .setIcon(<FaHashtag />)
    .and();

  const submitFunction = ({ id }, resetFields) => {
    getOrder(id)
      .then(() => {
        openOrder(id);
        resetFields();
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage("*Invalid Id " + err);
      });
  };

  return <>{builder.build(submitFunction)}</>;
};

FindOrderForm.propTypes = {
  openOrder: PropTypes.func,
};

export default FindOrderForm;
