import { useMemo, useState } from "react";
import styles from "./MenuPage.module.css";
import PageLoader from "../components/PageLoader";
import ErrorState from "../components/ErrorState";
import MealCard from "../components/MealCard";
import { useMeals } from "../hooks/useMeals";

export default function MenuPage() {
  const { meals, loading, error, refetch } = useMeals();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

    if (!normalizedSearch) return meals;

    return meals.filter((meal) => {
      return (
        meal.name.toLocaleLowerCase().includes(normalizedSearch) ||
        meal.category.toLocaleLowerCase().includes(normalizedSearch)
      );
    });
  }, [meals, searchTerm]);

  const categoryCount = useMemo(() => {
    return new Set(meals.map((meal) => meal.category)).size;
  }, [meals]);

  function handleAddToCar(meal) {
    console.log("Sepete eklendi!", meal);
  }

  return (
    <div className="page-section">
      <section className={`${styles.hero} panel`}>
        <div className="section-heading">
          <p className="pill">Menu Page</p>
          <h2>Menü</h2>
        </div>

        <div className={styles.heroStats}>
          <div>
            <strong>{meals.length}</strong>
            <span>Toplam Ürün</span>
          </div>

          <div>
            <strong>{categoryCount}</strong>
            <span>Kategori</span>
          </div>
        </div>
      </section>

      <section className={`${styles.toolbar} panel`}>
        <label className={styles.search}>
          <span>Menü içinde ara</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Burger, tatlı, içecek..."
          />
        </label>
      </section>

      {loading ? <PageLoader label="Menü yükleniyor..." /> : null}

      {!loading && error ? (
        <ErrorState
          title="Menü yüklenemedi"
          message={error}
          onRetry={refetch}
        />
      ) : null}

      {!loading && !error ? (
        filteredMeals.length > 0 ? (
          <section className={styles.grid}>
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onAdd={handleAddToCar} />
            ))}
          </section>
        ) : (
          <section className={`${styles.emptyState} panel`}>
            <h3>Aramaya uygun ürün bulunamadı.</h3>
            <p>
              Farklı bir kelime deneyebilir veya arama alanını
              temizleyebilirsin.
            </p>
          </section>
        )
      ) : null}
    </div>
  );
}
