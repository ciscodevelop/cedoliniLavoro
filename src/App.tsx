import { Outlet } from "react-router-dom";
import "./App.scss";
import { NavBar, Footer } from "@/components/";
import Hero from "./pages/hero/Hero";

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
