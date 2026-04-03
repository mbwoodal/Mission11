import "./App.css";
import { CartProvider } from "./components/CartContext";
import CartPage from "./components/CartPage";
import BookstorePage from "./components/BookstorePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookstorePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
