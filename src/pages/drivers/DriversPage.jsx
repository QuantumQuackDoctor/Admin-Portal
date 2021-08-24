import { findDriver } from "../../services/DriverService";
import Header from "../../shared/header/Header";
import DriverWidget from "./driver-widget/DriverWidget";

const DriversPage = () => {
  return (
    <Header>
      <DriverWidget driver={findDriver()}></DriverWidget>
    </Header>
  );
};

export default DriversPage;
