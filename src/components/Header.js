import { Link } from 'react-router-dom';

function Header() {
    return (
      <header>
<nav>
<ul>
  <li>
    <Link to="/">App</Link>
  </li>
  <li>
    <Link to="/help">Help</Link>
  </li>
  <li>
    <Link to="/home">Home</Link>
  </li>
</ul>
</nav>
</header>
    );
}

export default Header;