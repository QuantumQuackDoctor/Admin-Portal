import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { activate } from "../../services/AuthService";

const Activate = () => {
  const { token } = useParams();
  const [activationStatus, setActivationStatus] = useState({
    loading: true,
    error: false,
    errorMessage: "",
  });
  useEffect(() => {
    activate(token).then(
      (res) => {
        setActivationStatus({
          loading: false,
          error: false,
          errorMessage: "",
        });
      },
      (err) => {
        let errorMessage = "";
        switch (err.response.status) {
          case 404:
            errorMessage = "account not found";
            break;
          case 410:
            errorMessage = "activation expired, check email";
            break;
          default:
            errorMessage = "could not connect to server";
        }
        setActivationStatus({
          loading: false,
          error: true,
          errorMessage,
        });
      }
    );
  }, [token, setActivationStatus]);

  if (activationStatus.loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (activationStatus.error) {
    return (
      <div>
        <h1>Acctivation Failed, {activationStatus.errorMessage}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Activation successful</h1>
      <Link to="/account">Login</Link>
    </div>
  );
};

export default Activate;
