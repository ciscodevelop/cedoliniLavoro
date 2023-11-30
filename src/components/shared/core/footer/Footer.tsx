import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./footer.scss";
export function Footer() {
  return (
    <footer className="footer-basic">
      <div className="social">
        <NavLink to="#">
          <Icon icon="ion:logo-instagram" />
        </NavLink>
        <NavLink to="#">
          <Icon icon="ion:logo-snapchat" />
        </NavLink>
        <NavLink to="#">
          <Icon icon="ion:logo-twitter" />
        </NavLink>
        <NavLink to="#">
          <Icon icon="ion:logo-facebook" />
        </NavLink>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <NavLink to="home">Home</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="#">Services</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="#">Terms</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="#">Privacy Policy</NavLink>
        </li>
      </ul>
      <p className="copyright">Company Cisco © 2023</p>
    </footer>
  );
}

export default Footer;
