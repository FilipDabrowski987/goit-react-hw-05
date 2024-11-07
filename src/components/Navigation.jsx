import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" style={{ marginRight: '10px' }}>
        HOME
      </NavLink>
      <NavLink to="/movies">
        MOVIES
      </NavLink>
    </nav>
  );
};

export default Navigation;