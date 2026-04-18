import React from "react";
import styles from "./MealCard.module.css";

// proplar değişmediği takdirde meal kartı tekrar çizmez, render etmez : memo
const MealCard = React.memo(function MealCard({ meal, onAdd }) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.category}>{meal.category}</span>
        <strong className={styles.price}>{meal.price}</strong>
      </div>
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <button
        type="button"
        className="button button--brand"
        onClick={() => onAdd(meal)}
      >
        Sepete Ekle
      </button>
    </article>
  );
});

export default MealCard;
