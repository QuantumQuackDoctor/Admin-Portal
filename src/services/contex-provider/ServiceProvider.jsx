import React from "react";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import AuthService from "../AuthService";

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const services = {
    authentication: new AuthService(),
  };

  return (
    <ServiceContext.Provider value={services}>
      {[children].flat()}
    </ServiceContext.Provider>
  );
};

ServiceProvider.propTypes = {
  children: PropTypes.any,
};

/**
 *
 * @returns {AuthService}
 */
export const useAuth = () => {
  return useContext(ServiceContext).authentication;
};

export default ServiceProvider;
