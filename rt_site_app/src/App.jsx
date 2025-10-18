import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
//import AboutPage from "./pages/About";
//import Team from "./pages/Team";
import Filiere from "./pages/Filiere";
import Members from "./pages/Members"
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filiere" element={<Filiere />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
