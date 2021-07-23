import { BrowserRouter } from "react-router-dom";
import { WidgetContainer, Widget } from "./shared/widget/Widget";
import "./App.css";
import Header from "./shared/header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
    </BrowserRouter>
  );
}

export default App;
