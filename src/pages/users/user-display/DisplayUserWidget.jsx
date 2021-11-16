import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserById, updateUser } from "../../../services/UserService";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";
import {
  FaCalendar,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const DisplayUserWidget = ({ id, close }) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    DOB: "",
    phone: "",
    isVeteran: false,
  });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getUserById(id)
      .then((response) => {
        setUser(response.data);
        setReady(true);
      })
      .catch(() => {
        close();
      });
  }, [id, close]);

  const builder = new FormBuilder("Update User");

  const [errorMessage, setErrorMessage] = useState("");

  const formSubmit = async (data) => {
    const updatePassword = data.password !== "";

    try {
      await updateUser({ ...user, ...data }, updatePassword);
      setErrorMessage("");
      const response = await getUserById(id);
      setUser(response.data);
    } catch (err) {
      switch (err.response.status) {
        default:
          setErrorMessage("*Server Error");
      }
    }
  };

  builder
    .setChildComponent(
      <div>
        <button
          className="FormWidget-submit"
          style={{ width: "100%" }}
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    )
    .addErrorMessageState(errorMessage)
    .setShowReset(true)
    .setSubmitText("Update")

    .addField("Email", "email")
    .setIcon(<FaEnvelope />)
    .addValidator(Validators.Email)
    .setErrorMessage("*Must be a valid email")
    .setInitialValue(user.email)
    .and()

    .addField("Password", "password")
    .setIcon(<FaLock />)
    .addValidator((input) => {
      return input === "" || input.length >= 8;
    })
    .setErrorMessage("*password must be at least 8 characters")
    .and()

    .addField("First name", "firstName")
    .setIcon(<FaUser />)
    .addValidator(Validators.Min(3))
    .setErrorMessage("*Must have a first name")
    .setInitialValue(user.firstName)
    .and()

    .addField("Last name", "lastName")
    .setIcon(<FaUser />)
    .setInitialValue(user.lastName)
    .and()

    .addField("Birth date", "DOB")
    .addValidator(Validators.Required)
    .addValidator(Validators.Age(18))
    .setErrorMessage("*must be over 18")
    .setInitialValue(user.DOB)
    .setIcon(<FaCalendar />)
    .setInputType("date")
    .and()

    .addField("Phone", "phone")
    .setIcon(<FaPhone />)
    .addValidator((val) => val === undefined || val === "" || val.length === 8)
    .and()

    .addField("Veteran", "isVeteran")
    .setInputType("checkbox")
    .setInitialValue(user.isVeteran);

  return <div>{ready ? builder.build(formSubmit) : <></>}</div>;
};

DisplayUserWidget.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
};

export default DisplayUserWidget;
