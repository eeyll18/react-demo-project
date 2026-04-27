import { useCallback, useEffect, useState } from "react";
import { fetchOrders } from "../services/orderService";

export function useOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchOrders();
      setOrders(response);
    } catch (requestError) {
      setError(requestError.message || "Menü verisi alınamadı!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    refresh: loadOrders,
  };
}
