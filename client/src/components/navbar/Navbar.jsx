import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
import Cookies from 'js-cookie';


const Navbar = () => {

  const {user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('access_token');
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  // Hàm login
  const handleLogin = () => {
    navigate("/login");  // Điều hướng về trang login khi nhấn nút login
  };

  const handleRegister = () => {
    navigate("/register");  // Điều hướng đến trang đăng ký
  };

  console.log("Navbar",user);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
        </Link>   {/* if there is user show his username otherwise show this div.  */}
        {user ? (
          <div className="navItems">
            <span className="navUsername">Welcome, {user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar