import { Outlet } from "react-router-dom";
import "./App.scss";
// import { NavBar, Footer } from "@/components/";
import Hero from "./pages/hero/Hero";
import { Footer } from "./components/shared/core/footer/Footer";
import NavBar from "./components/shared/core/navBar/NavBar";

function App() {
  
  return (
    <>
      <NavBar />
      <Hero />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
