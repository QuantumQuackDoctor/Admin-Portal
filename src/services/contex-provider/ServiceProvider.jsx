import { createContext, useContext } from "react";
import AuthService from "../AuthService";

export const ServiceContext = createContext();

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

export const useAuth = () => {
  return useContext(ServiceContext).authentication;
};

export default ServiceProvider;
