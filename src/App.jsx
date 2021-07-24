import { BrowserRouter } from "react-router-dom";
import { WidgetContainer } from "./shared/widget/Widget";
import "./App.css";
import Header from "./shared/header/Header";
import { FormBuilder, Validators } from "./shared/form-widget/FormWidget";
import { FaAngleDown } from "react-icons/fa";

function App() {
  let builder = new FormBuilder();
  builder.addField("test", "test", null, "placeholder", "required", [
    Validators.Required,
  ]);
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
