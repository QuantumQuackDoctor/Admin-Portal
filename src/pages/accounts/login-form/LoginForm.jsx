import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  FormBuilder,
  Validators,
} from "../../../shared/form-widget/FormWidget";
import { useEffect, useState } from "react";
import { useAuth } from "../../../services/contex-provider/ServiceProvider";
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
    .addValidator(Validators.Password)
    .setErrorMessage(
      "*password must have 1 Uppercase, Number, and special character"
    )
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
