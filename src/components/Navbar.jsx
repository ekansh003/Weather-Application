import { FaGithub } from "react-icons/fa";
import { HiOutlineMoon } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">☁️</div>

        <div className="brand-text">
          <h1>Nimbus</h1>
          <p>Real-Time Weather</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button
          className="nav-btn"
          title="GitHub Repository"
          aria-label="GitHub Repository"
          onClick={() =>
            window.open(
              "https://github.com/ekansh003/Weather-Application",
              "_blank",
            )
          }
        >
          <FaGithub />
        </button>

        <button
          className="nav-btn"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          <HiOutlineMoon />
        </button>

        <button className="nav-btn" title="Settings" aria-label="Settings">
          <IoSettingsOutline />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
