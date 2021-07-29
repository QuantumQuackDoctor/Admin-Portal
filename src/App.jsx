import { BrowserRouter } from "react-router-dom";
import { WidgetContainer } from "./shared/widget/Widget";
import "./App.css";
import Header from "./shared/header/Header";
import LoginForm from "./shared/login-form/LoginForm";
import ServiceProvider from "./services/contex-provider/ServiceProvider";

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Header>
          <WidgetContainer>
            <LoginForm></LoginForm>
          </WidgetContainer>
        </Header>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
