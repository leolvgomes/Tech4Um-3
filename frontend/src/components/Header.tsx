import "./Header.css";
import logo from "../assets/img/Logo.png";
import person from "../assets/img/person_24dp_5E7488_FILL0_wght400_GRAD0_opsz24.png"

export function Header() {
  return (
    <header className="header">
        <img src={logo} alt="Logo" className="logo"/>
      <nav>
        <a href="">
            <img src={person} alt="" id="loginIcon"/>
            <h2>Login</h2>
        </a>
      </nav>
    </header>
  );
}
