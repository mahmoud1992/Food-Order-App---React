import logoImg from "../assets/logo.jpg";
function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="React Food Logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}

export default Header;
