import { useContext } from "react";
import { useUser } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const { setToken } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
