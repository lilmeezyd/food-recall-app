import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fda from "./pages/Recalls/Fda"
import Usda from "./pages/Recalls/Usda"
import ApiProvider from "./pages/ApiProvider";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import Header from "./components/Header";
import Footer from "./components/Footer"
import UsdaRecall from "./pages/UsdaRecall";
import FdaRecall from "./pages/FdaRecall";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recalls/fda" element={<Fda />} />
          <Route path="/recalls/usda" element={<Usda />} />
          <Route path="/recalls/fda/:fdaId" element={<FdaRecall />} />
          <Route path="/recalls/usda/:usdaId" element={<UsdaRecall />} />
          <Route path="/api-provider" element={<ApiProvider />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
        <Footer />
    </Router>
  );
}

export default App;
