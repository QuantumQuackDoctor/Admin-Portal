import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import {
  deleteDriver,
  getDriver,
  updateDriver,
} from "../../../services/DriverService";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";
import { FaLock, FaIdCard, FaCar, FaCalendar, FaPhone } from "react-icons/fa";
import { useSingletonCall } from "../../../util/SingletonHook";
import "./EditDriverWidget.css";

const EditDriverWidget = ({ id, close }) => {
  const [driver, setDriver] = useState({});

  const updateInfo = () => {
    getDriver(id)
      .then((res) => {
        setDriver(res.data);
      })
      .catch(() => {
        close();
      });
  };

  useSingletonCall(() => {
    updateInfo();
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleDeleteClicked = () => {
    if (!deleteClicked) {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        setDeleteClicked(true);
      }, 200);
    } else {
      deleteDriver(id).then(() => {
        close();
      });
    }
  };

  const builder = new FormBuilder(`Driver: ${driver.firstName}`);

  builder
    .addErrorMessageState(errorMessage)
    .setUseRows(true)
    .setSubmitText("Update")
    .setShowReset(true)
    .setChildComponent(
      <div>
        <button
          className="FormWidget-submit"
          style={{ width: "100%" }}
          onClick={() => close()}
        >
          Close
        </button>
        <button
          className="FormWidget-submit"
          style={{ width: "100%", backgroundColor: "red" }}
          onClick={handleDeleteClicked}
          data-testid="delete-button"
        >
          <span
            className={
              fadeOut ? "EditDriverWidget-fadeout" : "EditDriverWidget-fadein"
            }
          >
            {deleteClicked ? "Confirm Delete" : "Delete"}
          </span>
        </button>
      </div>
    )

    .addField("Email", "email")
    .addValidator(Validators.Email)
    .setErrorMessage("email required")
    .setInitialValue(driver.email)
    .setIcon(<FaEnvelope />)
    .and()

    .addField("Password", "password")
    .addValidator((input) => {
      return input === "" || input.length >= 8;
    })
    .setIcon(<FaLock />)
    .setErrorMessage("*password not long enough")
    .and()

    .addField("First name", "firstName")
    .setDesiredRow(1)
    .addValidator(Validators.Required)
    .setInitialValue(driver.firstName)
    .setErrorMessage("first name required")
    .setIcon(<FaIdCard />)
    .and()

    .addField("Last name", "lastName")
    .addValidator(Validators.Required)
    .setErrorMessage("last name required")
    .setInitialValue(driver.lastName)
    .setIcon(<FaIdCard />)
    .and()

    .addField("Car", "car")
    .setDesiredRow(2)
    .addValidator(Validators.Required)
    .addValidator(Validators.Min(5))
    .setErrorMessage("car make required")
    .setInitialValue(driver.car)
    .setIcon(<FaCar />)
    .and()

    .addField("Birth date", "DOB")
    .addValidator(Validators.Required)
    .addValidator(Validators.Age(18))
    .setErrorMessage("*must be over 18")
    .setInitialValue(driver.DOB)
    .setIcon(<FaCalendar />)
    .setInputType("date")
    .and()

    .addField("Phone", "phone")
    .setDesiredRow(3)
    .addValidator(Validators.Required)
    .addValidator(Validators.Pattern(/^(\+1)?-?\d{3}-?\d{3}-?\d{4}$/))
    .setErrorMessage("*must be a valid phone number")
    .setInitialValue(driver.phone)
    .setIcon(<FaPhone />)
    .and();

  const submitFunction = (data, reset) => {
    let updatePassword = data.password.length > 0;
    let tempDriver = {
      ...driver,
      ...data,
      password: updatePassword ? data.password : "11111111",
    };
    updateDriver(tempDriver, updatePassword)
      .then(async () => {
        await updateInfo();
        setErrorMessage("");
        reset();
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            setErrorMessage("driver not found");
            break;
          default:
            setErrorMessage("server error");
        }
      });
  };

  return (
    <div style={{ display: driver.email ? "inline-block" : "none" }}>
      {driver.email ? builder.build(submitFunction) : <div>Loading</div>}
    </div>
  );
};

EditDriverWidget.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
};

export default EditDriverWidget;
