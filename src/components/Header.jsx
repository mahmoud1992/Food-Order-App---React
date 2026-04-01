import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="React Food Logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}

export default Header;
