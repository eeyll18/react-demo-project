import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import styles from "./AppLayout.module.css";

function getLinkClassName({ isActive }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function AppLayout() {
  const { totalItems } = useCart();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <p className="pill">demo project</p>
          <div>
            <h1>Food Order App</h1>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClassName}>
            Menü
          </NavLink>
          <NavLink to="/cart" className={getLinkClassName}>
            Sepet
            <span className={styles.badge}>{totalItems}</span>
          </NavLink>
          <NavLink to="/history" className={getLinkClassName}>
            Geçmiş
          </NavLink>
        </nav>
      </header>

      {/* ortak header sabit, sayfa içeriği değiştirme - alt routelar */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
