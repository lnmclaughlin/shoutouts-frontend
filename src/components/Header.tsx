import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="Header">
      <h1>
        <Link to="/" className="heading">
          GC Shoutouts
        </Link>
      </h1>
      {/* hello */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {user ? (
        <>
          <button className="sign-out" onClick={signOut}>
            Sign Out
          </button>
          <p className="welcome">Welcome {user?.displayName}</p>
          <img src={user.photoURL!} alt="" className="user-img" />
          <p>
            <Link className="my-shoutouts" to="/me">
              See My Shoutouts
            </Link>
          </p>
          <div className="favorites">
            <p>Favorites: </p>
            <Link to="/favorites">
              {" "}
              <i className="fa-solid fa-heart"></i>
            </Link>
          </div>
        </>
      ) : (
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
