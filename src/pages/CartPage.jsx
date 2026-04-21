import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";
import OrderForm from "../components/OrderForm";
import styles from "./CartPage.module.css";

function CartPage() {
  const {
    items,
    totalAmount,
    totalItems,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart();

  // checkoutu göster-gösterme
  const [showCheckout, setShowCheckout] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");

  const handleIncrease = useCallback(
    (item) => {
      addItem(item);
    },
    [addItem],
  );

  const handleOrderSuccess = useCallback(
    (createdOrder) => {
      setLastOrderId(createdOrder.id);
      clearCart();
      setShowCheckout(false);
    },
    [clearCart],
  );

  const hasItems = items.length > 0;

  return (
    <div className="page-section">
      <section className={`${styles.hero} panel`}>
        <div className="section-heading">
          <p className="pill">Cart Context</p>
          <h2>Bu sayfa global state üzerinden çalışıyor</h2>
          {/* Menü sayfasından eklenen ürünler burada yeniden fetch edilmeden görünür => contextApi */}
        </div>

        <div className={styles.summaryCards}>
          <div>
            <strong>{totalItems}</strong>
            <span>Toplam Adet</span>
          </div>
          <div>
            <strong>{totalAmount.toFixed(2)}TL</strong>
            <span>Genel Toplam</span>
          </div>
        </div>
      </section>

      {!hasItems ? (
        <section className={`${styles.emptyState} panel`}>
          <h2>Sepet şu an boş.</h2>
          <p>Menü sayfasına gidip ürün ekleyebilirsiniz.</p>

          {lastOrderId ? (
            <p className={styles.succesText}>
              Son oluşturulan sipariş: <strong>{lastOrderId}</strong>
            </p>
          ) : null}
        </section>
      ) : (
        <section className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={decreaseItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <aside className={`${styles.sidebar} panel`}>
            <div className={styles.sidebarBlock}>
              <h3>Sipariş Özeti</h3>
              <p>
                {totalItems} ürün, toplam{" "}
                <strong>{totalAmount.toFixed(2)}TL</strong>
              </p>
            </div>

            <div className={styles.sidebarButtons}>
              <button
                className="button button--brand"
                type="button"
                onClick={() => setShowCheckout((current) => !current)}
              >
                {showCheckout ? "Formu Gizle" : "Siparişe Geç"}
              </button>
              <button
                className="button button--danger"
                type="button"
                onClick={clearCart}
              >
                Sepeti Temizle
              </button>
            </div>
          </aside>
        </section>
      )}

      {hasItems && showCheckout ? (
        <OrderForm
          items={items}
          totalAmount={totalAmount}
          onSuccess={handleOrderSuccess}
        />
      ) : null}
    </div>
  );
}

export default CartPage;
