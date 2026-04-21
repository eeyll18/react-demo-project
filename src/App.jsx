import { Route, Routes } from "react-router-dom";
import "./App.css";
import MenuPage from "./pages/MenuPage";
import AppLayout from "./components/AppLayout";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
