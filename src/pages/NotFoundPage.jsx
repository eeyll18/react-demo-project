import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={`${styles.wrapper} panel`}>
      <p className={styles.pill}>404</p>
      <h2>Aranan sayfa bulunamadı.</h2>
      <Link className="button button--brand" to="/">
        Ana Sayfaya Dön
      </Link>
    </section>
  );
}
