import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <WiDayCloudy className="footer-logo" />
        <h3>Nimbus</h3>
      </div>

      <div className="footer-center">
        <p>© 2026 Ekansh Jaiswal</p>
      </div>

      <div className="footer-right">
        <a
          href="https://github.com/ekansh003/Nimbus"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>

        <span className="divider">•</span>

        <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
          🌤
          <span>OpenWeather</span>
        </a>
      </div>
    </footer>
  );
}
