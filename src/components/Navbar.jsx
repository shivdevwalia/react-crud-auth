import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContextprovider";

function Navbar() {
  const { isAuth, logout } = useContext(AuthContext);
  return (
    <nav>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/albums">Albums</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isAuth && <button onClick={logout}>Log out</button>}
      </ul>
    </nav>
  );
}

export default Navbar;
