import { useState } from "react";
import {
  FaLock,
  FaCar,
  FaEnvelope,
  FaIdCard,
  FaCalendar,
  FaPhone,
} from "react-icons/fa";
import { createDriver } from "../../../services/DriverService";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";

const CreateDriverWidget = () => {
  let builder = new FormBuilder("Create Driver");

  builder
    .setUseRows(true)
    .setSubmitText("Create")
    .setShowReset(true)

    .addField("Email", "email")
    .addValidator(Validators.Email)
    .setErrorMessage("email required")
    .setIcon(<FaEnvelope />)
    .and()

    .addField("Password", "password")
    .addValidator(Validators.Min(8))
    .setIcon(<FaLock />)
    .setErrorMessage("*password not long enough")
    .setInputType("password")
    .and()

    .addField("First name", "firstName")
    .setDesiredRow(1)
    .addValidator(Validators.Required)
    .setErrorMessage("first name required")
    .setIcon(<FaIdCard />)
    .and()

    .addField("Last name", "lastName")
    .addValidator(Validators.Required)
    .setErrorMessage("last name required")
    .setIcon(<FaIdCard />)
    .and()

    .addField("Car", "car")
    .setDesiredRow(2)
    .addValidator(Validators.Required)
    .addValidator(Validators.Min(5))
    .setErrorMessage("car make required")
    .setIcon(<FaCar />)
    .and()

    .addField("Birth date", "DOB")
    .addValidator(Validators.Required)
    .addValidator(Validators.Age(18))
    .setErrorMessage("*must be over 18")
    .setIcon(<FaCalendar />)
    .setInputType("date")
    .and()

    .addField("Phone", "phone")
    .setDesiredRow(3)
    .addValidator(Validators.Required)
    .addValidator(Validators.Pattern(/^(\+1)?-?\d{3}-?\d{3}-?\d{4}$/))
    .setErrorMessage("*must be a valid phone number")
    .setIcon(<FaPhone />)
    .and();

  const reformatFormOutput = (output) => {
    return {
      email: output.email,
      firstName: output.firstName,
      lastName: output.lastName,
      DOB: output.DOB,
      car: output.car,
      password: output.password,
      phone: output.phone,
      settings: {
        notifications: {
          text: true,
          email: true,
        },
        theme: "light",
      },
    };
  };

  const [errorMessage, setErrorMessage] = useState("");
  builder.addErrorMessageState(errorMessage);

  const submitFn = async (input) => {
    try {
      let res = await createDriver(reformatFormOutput(input));
      setErrorMessage(
        "driver created, TODO open driver info. id: " + res.data.id
      );
    } catch (e) {
      switch (e.response.status) {
        case 409:
          setErrorMessage("*email taken");
          break;
        default:
          setErrorMessage("*server error");
      }
    }
  };

  return <>{builder.build(submitFn)}</>;
};

export default CreateDriverWidget;
