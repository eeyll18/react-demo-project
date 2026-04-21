import { useState } from "react";
import { submitOrder } from "../services/orderService";
import styles from "./OrderForm.module.css";

const initialFormState = {
  name: "",
  address: "",
  note: "",
};

export default function OrderForm({ items, totalAmount, onSuccess }) {
  const [formData, setFormData] = useState(initialFormState); // obje tut
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    // *
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);

      const createOrder = await submitOrder({
        customer: formData,
        items,
        totalAmount,
      });

      setFormData(initialFormState);

      onSuccess(createOrder);
    } catch (requestError) {
      setError(requestError.message || "Sipariş alınamadı");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`${styles.wrapper} panel`}>
      <div className={styles.heading}>
        <p className="pill">Async Submit</p>

        <div>
          <h2>Sipariş Bilgisi</h2>
          <p>Gerçek backend yerine localStorage kullanan demo</p>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Ad-Soyad</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn:Ayşe Yılmaz"
          />
        </label>
        <label>
          <span>Adres</span>
          <textarea
            onChange={handleChange}
            name="address"
            rows="3"
            value={formData.address}
            placeholder="Mahalle, sokak, apartman bilgisi"
          />
        </label>

        <label>
          <span>Sipariş notu</span>
          <textarea
            onChange={handleChange}
            name="note"
            rows="3"
            value={formData.note}
            placeholder="İsteğe bağlı"
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Gönderiliyor..." : "Siparişi Tamamla"}
        </button>
      </form>
    </section>
  );
}
