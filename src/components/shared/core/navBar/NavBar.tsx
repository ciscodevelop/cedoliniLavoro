import { NavLink } from "react-router-dom";
import "./navbar.scss";

export function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="container-logo">
        <img src="assets/logo.png" alt="logo" />
        <span>Cisco Payslips</span>
      </div>
      <div className="container-center"></div>
      <div className="container-menu">
        <NavLink to={"/home"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/table"}>PaySlip</NavLink>
        
      </div>
    </nav>
  );
}
export default NavBar;
