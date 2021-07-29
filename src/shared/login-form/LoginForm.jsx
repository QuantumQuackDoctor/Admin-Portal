import { FaEnvelope, FaLock } from "react-icons/fa";
import { FormBuilder, Validators } from "../form-widget/FormWidget";
import { AuthServiceFactory } from "../../services/AuthService";
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

  const builder = new FormBuilder("Login");
  builder
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
  const submitFunction = (authRequest) => {
    authRequest["isDriver"] = false;
    authService.login(authRequest);
  };
  return <>{authenticated ? "" : builder.build(submitFunction)}</>;
};

export default LoginForm;
