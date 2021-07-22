import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./shared/header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <div style={{ color: "white" }}>Test</div>
      </Header>
    </BrowserRouter>
  );
}

export default App;
