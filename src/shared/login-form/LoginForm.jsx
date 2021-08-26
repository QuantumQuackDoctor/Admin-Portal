import { FaEnvelope, FaLock } from "react-icons/fa";
import { FormBuilder, Validators } from "../form-widget/FormWidget";
import { useEffect, useState } from "react";
import { useAuth } from "../../services/contex-provider/ServiceProvider";
const LoginForm = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const authService = useAuth();

  useEffect(() => {
    const cb = (status) => {
      setAuthenticated(status);
    };
    let unsubscribe = authService.subscribe(cb);
    return () => {
      unsubscribe();
    };
  }, [authService, setAuthenticated]);

  const [erorrMessage, setErrorMessage] = useState("");

  const builder = new FormBuilder("Login");
  builder
    .addErrorMessageState(erorrMessage)
    .addField("Email", "email")
    .addValidator(Validators.Email)
    .setErrorMessage("*email not valid")
    .setIcon(<FaEnvelope />)
    .setPlaceholder("email")
    .and()

    .addField("Password", "password")
    .addValidator(Validators.Min(8))
    .setErrorMessage("*password must be 8 characters or more")
    .setInputType("password")
    .setPlaceholder("password")
    .setIcon(<FaLock />);
  const submitFunction = async (authRequest) => {
    authRequest["isDriver"] = false;
    let errorCode = await authService.login(authRequest);
    if (errorCode) {
      switch (errorCode) {
        case 401:
          setErrorMessage("Incorrect email or password");
          break;
        default:
          setErrorMessage("Failed to connect to server");
      }
    }
  };
  return <>{authenticated ? "" : builder.build(submitFunction)}</>;
};

export default LoginForm;
