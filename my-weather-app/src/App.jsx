import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherPage from "./Pages/WeatherPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:country" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
