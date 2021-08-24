import {
  FaLock,
  FaCar,
  FaEnvelope,
  FaIdCard,
  FaCalendar,
  FaPhone,
} from "react-icons/fa";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";

const DriverWidget = ({ driver }) => {
  let builder = new FormBuilder("Create Driver");

  builder
    .setChildComponent(<>Test</>)
    .setSubmitText("Update")
    .addField("Email", "email")
    .addValidator(Validators.Email)
    .setInitialValue(driver.email)
    .setErrorMessage("email required")
    .setIcon(<FaEnvelope />)
    .and()

    .addField("Password", "password")
    .addValidator(Validators.Min(8))
    .setPlaceholder("password")
    .setIcon(<FaLock />)
    .setErrorMessage("*password not long enough")
    .setInputType("password")
    .and()

    .addField("First name", "firstName")
    .addValidator(Validators.Required)
    .setInitialValue(driver.firstName)
    .setErrorMessage("first name required")
    .setIcon(<FaIdCard />)
    .and()

    .addField("Last name", "lastName")
    .addValidator(Validators.Required)
    .setInitialValue(driver.lastName)
    .setErrorMessage("last name required")
    .setIcon(<FaIdCard />)
    .and()

    .addField("Car", "car")
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
    .setIcon(<FaCalendar />)
    .setInputType("date")
    .and()

    .addField("Password", "password")
    .addValidator(Validators.Required)
    .addValidator(Validators.Pattern(/^(\+1)?-?\d{3}-?\d{3}-?\d{4}$/))
    .setErrorMessage("*must be a valid phone number")
    .setIcon(<FaPhone />)
    .and();

  return <>{builder.build()}</>;
};

export default DriverWidget;
