import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { activate } from "../../services/AuthService";
import "./Activate.css";

const Activate = () => {
  const { token } = useParams();
  const [activationStatus, setActivationStatus] = useState({
    loading: true,
    error: false,
    errorMessage: "",
  });
  useEffect(() => {
    activate(token).then(
      () => {
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
      <div className="Activate-center">
        <div className="Activate-container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  if (activationStatus.error) {
    return (
      <div className="Activate-center">
        <div className="Activate-container">
          <h1>Acctivation Failed, {activationStatus.errorMessage}</h1>
          <Link to="/account" className="Activate-link">
            Return to Register/Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="Activate-center">
      <div className="Activate-container">
        <h1>Account Activated</h1>
        <p>
          This account has been confirmed. You may click on the link below to
          log in now.
        </p>
        <Link to="/account" className="Activate-link">
          Log in to Scrumptious
        </Link>
      </div>
    </div>
  );
};

export default Activate;
