import { BrowserRouter } from "react-router-dom";
import { WidgetContainer } from "./shared/widget/Widget";
import "./App.css";
import Header from "./shared/header/Header";
import { FormBuilder, Validators } from "./shared/form-widget/FormWidget";
import { FaThemeisle } from "react-icons/fa";

function App() {
  let builder = new FormBuilder("testTitle")
    .addField("test", "test")
    .setPlaceholder("placeholder")
    .setValidators([Validators.Required])
    .setErrorMessage("required")
    .and()
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .and();
  return (
    <BrowserRouter>
      <Header>
        <WidgetContainer>
          {builder.build((value) => {
            console.log(value);
          })}
        </WidgetContainer>
      </Header>
    </BrowserRouter>
  );
}

export default App;
