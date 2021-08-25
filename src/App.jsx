import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import ServiceProvider from "./services/contex-provider/ServiceProvider";
import HomePage from "./pages/home/HomePage";
import AccountsPage from "./pages/accounts/AcccountsPage";
import UsersPage from "./pages/users/UsersPage";
import OrdersPage from "./pages/orders/OrdersPage";
import RestaurantsPage from "./pages/restaurants/RestaurantsPage";
import DriversPage from "./pages/drivers/DriversPage";

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Switch>
          <Route exact path={["/", "/home"]} component={HomePage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/drivers" component={DriversPage} />
          <Route path="/restaurants" component={RestaurantsPage} />
          <Route path="/account" component={AccountsPage} />
        </Switch>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
