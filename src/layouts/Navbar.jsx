import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <h3 className="logo">Mini Tools</h3>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/splitter">Splitter</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </nav>
  );
}
