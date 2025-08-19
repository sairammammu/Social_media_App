import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../components/Navbar.css"




export const Navbar = () => {
  const [user] = useAuthState(auth);

  const userSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        {!user ? (
          <Link className="nav-link" to="login">Login</Link>
        ) : (
          <Link className="nav-link" to="createpost">Create Post</Link>
        )}
      </div>

      {user && (
        <div className="user-section">
          <p className="user-name">{user?.displayName}</p>
          <img
            className="user-avatar"
            src={auth.currentUser?.photoURL || ""}
            width={35}
            height={35}
            alt="User profile"
          />
          <button className="signout-btn" onClick={userSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
