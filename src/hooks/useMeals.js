import { useCallback, useEffect, useState } from "react";
import { fetchMeals } from "../services/mealService";

export function useMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMeals = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchMeals();
      setMeals(response);
    } catch (requestError) {
      setError(requestError.message || "Menü verisi alınamadı!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMeals();
  }, [loadMeals]); // callback'e alındı, yukarının instance'ı değişiyorsa burası da değişmeli

  return {
    meals,
    loading,
    error,
    refetch: loadMeals,
  };
}
