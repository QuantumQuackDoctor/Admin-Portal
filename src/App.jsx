import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import ServiceProvider from "./services/contex-provider/ServiceProvider";
import HomePage from "./pages/home/HomePage";
import AccountsPage from "./pages/accounts/AcccountsPage";
import UsersPage from "./pages/users/UsersPage";
import OrdersPage from "./pages/orders/OrdersPage";
import RestaurantsPage from "./pages/restaurants/RestaurantsPage";
import DriversPage from "./pages/drivers/DriversPage";
import Activate from "./pages/activate/Activate";
import ResetPassword from "./pages/reset-password/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Switch>
          <Route exact path={["/", "/home"]} component={HomePage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/drivers/:id?" component={DriversPage} />
          <Route path="/restaurants" component={RestaurantsPage} />
          <Route path="/account" component={AccountsPage} />
          <Route path="/activate/:token" component={Activate} />
          <Route path="/reset-password/:token" component={ResetPassword} />
        </Switch>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
