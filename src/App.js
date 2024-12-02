import "./index.css";
import MainPage from "./components/MainPage";
import Home from "./components/Home";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";




function App() {
  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path= '/' element={ <MainPage />} />
          <Route path= '/home' element={ <Home />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
