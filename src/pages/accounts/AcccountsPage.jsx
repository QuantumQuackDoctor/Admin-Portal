import Header from "../../shared/header/Header";
import { WidgetContainer } from "../../shared/widget/Widget";
import LoginForm from "../../shared/login-form/LoginForm";
import { Route } from "react-router";
import RegisterForm from "./register-form/RegisterForm";

const AccountsPage = () => {
  return (
    <Header>
      <WidgetContainer>
        <Route path="/account/register" component={RegisterForm} />
        <LoginForm />
      </WidgetContainer>
    </Header>
  );
};

export default AccountsPage;
