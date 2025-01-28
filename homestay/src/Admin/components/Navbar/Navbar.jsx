import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export const Navbar = ({ handleMenuToggle }) => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.menu_icon}>
          <IoMenu onClick={handleMenuToggle} />
        </div>

        <div className={styles.nav_logo}>
          <img src="/logo.png" alt="logo" />
        </div>

        <h1>Admin</h1>
      </div>
    </>
  );
};
