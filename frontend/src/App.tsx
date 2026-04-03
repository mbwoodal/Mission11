import "./App.css";
import { CartProvider } from "./components/CartContext";
import CartPage from "./components/CartPage";
import BookstorePage from "./components/BookstorePage";
import AdminBooksPage from "./components/AdminBooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookstorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
